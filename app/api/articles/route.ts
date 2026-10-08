import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getArticles } from "@/lib/articles";
import { createMongoArticle } from "@/lib/mongo";
export async function GET(request: Request) { const includeDrafts = new URL(request.url).searchParams.has("admin"); if (includeDrafts && !(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); return NextResponse.json({ articles: await getArticles({ includeDrafts }) }); }
export async function POST(request: Request) { if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const article = await request.json(); if (!article.title || !article.slug || !article.content) return NextResponse.json({ error: "Missing fields" }, { status: 400 }); const saved = { ...article, id: crypto.randomUUID(), status: article.status || "draft" }; await createMongoArticle(saved); return NextResponse.json({ article: saved }, { status: 201 }); }