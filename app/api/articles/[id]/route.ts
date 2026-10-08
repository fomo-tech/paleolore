import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deleteMongoArticle, updateMongoArticle } from "@/lib/mongo";
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) { if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const article = await request.json(); await updateMongoArticle((await params).id, article); return NextResponse.json({ article }); }
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) { if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); await deleteMongoArticle((await params).id); return NextResponse.json({ ok: true }); }