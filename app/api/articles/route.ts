import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getArticles } from "@/lib/articles";
import { createMongoArticle } from "@/lib/mongo";
import type { Article } from "@/lib/content";

export async function GET(request: Request) {
  const includeDrafts = new URL(request.url).searchParams.has("admin");
  if (includeDrafts && !(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ articles: await getArticles({ includeDrafts }) });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const article = (await request.json().catch(() => ({}))) as Partial<Article>;
  if (!article.title || !article.slug || !article.content) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const saved = { ...article, id: crypto.randomUUID(), status: article.status || "draft" } as Article;
  const insertedId = await createMongoArticle(saved);
  if (!insertedId) return NextResponse.json({ error: "MongoDB is not configured" }, { status: 503 });
  return NextResponse.json({ article: saved }, { status: 201 });
}