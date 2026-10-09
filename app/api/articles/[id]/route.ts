import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deleteMongoArticle, updateMongoArticle } from "@/lib/mongo";
import type { Article } from "@/lib/content";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const article = (await request.json().catch(() => ({}))) as Partial<Article>;
  const updated = await updateMongoArticle((await params).id, article);
  if (updated === null) return NextResponse.json({ error: "MongoDB is not configured" }, { status: 503 });
  if (!updated) return NextResponse.json({ error: "Article not found" }, { status: 404 });
  return NextResponse.json({ article });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const deleted = await deleteMongoArticle((await params).id);
  if (deleted === null) return NextResponse.json({ error: "MongoDB is not configured" }, { status: 503 });
  if (!deleted) return NextResponse.json({ error: "Article not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}