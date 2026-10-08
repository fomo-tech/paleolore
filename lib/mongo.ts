import type { Article } from "./content";
type MongoResponse<T> = { document?: T; documents?: T[]; insertedId?: string };
const hasMongo = () => Boolean(process.env.MONGODB_DATA_API_URL && process.env.MONGODB_DATA_API_KEY && process.env.MONGODB_DATABASE);
async function mongoAction<T>(action: string, payload: Record<string, unknown>) {
  if (!hasMongo()) return null;
  const response = await fetch(`${process.env.MONGODB_DATA_API_URL}/action/${action}`, { method: "POST", headers: { "Content-Type": "application/json", "api-key": process.env.MONGODB_DATA_API_KEY! }, body: JSON.stringify({ dataSource: process.env.MONGODB_DATA_SOURCE || "Cluster0", database: process.env.MONGODB_DATABASE, collection: process.env.MONGODB_COLLECTION || "articles", ...payload }), cache: "no-store" });
  if (!response.ok) throw new Error(`MongoDB request failed: ${response.status}`);
  return (await response.json()) as MongoResponse<T>;
}
export async function listMongoArticles() { try { const result = await mongoAction<Article[]>("find", { filter: {}, sort: { date: -1 } }); return result?.documents ?? null; } catch { return null; } }
export async function findMongoArticle(slug: string) { try { const result = await mongoAction<Article>("findOne", { filter: { slug } }); return result?.document ?? null; } catch { return null; } }
export async function createMongoArticle(article: Article) { const result = await mongoAction<Article>("insertOne", { document: article }); return result?.insertedId ?? article.slug; }
export async function updateMongoArticle(id: string, article: Partial<Article>) { return mongoAction("updateOne", { filter: { $or: [{ _id: { $oid: id } }, { id }] }, update: { $set: article } }); }
export async function deleteMongoArticle(id: string) { return mongoAction("deleteOne", { filter: { $or: [{ _id: { $oid: id } }, { id }] } }); }