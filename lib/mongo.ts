import { MongoClient, ObjectId, type Collection, type Filter } from "mongodb";
import type { Article } from "./content";

type StoredArticle = Article & { _id?: ObjectId | string };
type MongoGlobal = typeof globalThis & {
  __archaeologistMongoClient?: MongoClient;
  __archaeologistMongoClientPromise?: Promise<MongoClient>;
};

const globalMongo = globalThis as MongoGlobal;

function getMongoUri() {
  return process.env.MONGODB_URI || process.env.MONGO_URI || "";
}

function getDatabaseName() {
  return process.env.MONGODB_DATABASE || process.env.MONGO_DATABASE || "archaeologist";
}

function getCollectionName() {
  return process.env.MONGODB_COLLECTION || "articles";
}

async function getArticleCollection(): Promise<Collection<StoredArticle> | null> {
  const uri = getMongoUri();
  if (!uri) return null;

  if (!globalMongo.__archaeologistMongoClientPromise) {
    const client = globalMongo.__archaeologistMongoClient || new MongoClient(uri);
    globalMongo.__archaeologistMongoClient = client;
    globalMongo.__archaeologistMongoClientPromise = client.connect();
  }

  const client = await globalMongo.__archaeologistMongoClientPromise;
  return client.db(getDatabaseName()).collection<StoredArticle>(getCollectionName());
}

function toArticle(document: StoredArticle): Article {
  const { _id, ...article } = document;
  return _id && !article.id ? { ...article, id: String(_id) } : article;
}

function articleIdFilter(id: string): Filter<StoredArticle> {
  const filters: Filter<StoredArticle>[] = [{ id }];
  if (ObjectId.isValid(id)) filters.unshift({ _id: new ObjectId(id) });
  return { $or: filters };
}

export async function listMongoArticles() {
  try {
    const collection = await getArticleCollection();
    if (!collection) return null;
    const documents = await collection.find({}).sort({ date: -1 }).toArray();
    return documents.map(toArticle);
  } catch {
    return null;
  }
}

export async function findMongoArticle(slug: string) {
  try {
    const collection = await getArticleCollection();
    if (!collection) return null;
    const document = await collection.findOne({ slug });
    return document ? toArticle(document) : null;
  } catch {
    return null;
  }
}

export async function createMongoArticle(article: Article) {
  const collection = await getArticleCollection();
  if (!collection) return null;
  const result = await collection.insertOne(article);
  return result.insertedId.toString();
}

export async function updateMongoArticle(id: string, article: Partial<Article>) {
  const collection = await getArticleCollection();
  if (!collection) return null;
  const result = await collection.updateOne(articleIdFilter(id), { $set: article });
  return result.matchedCount > 0;
}

export async function deleteMongoArticle(id: string) {
  const collection = await getArticleCollection();
  if (!collection) return null;
  const result = await collection.deleteOne(articleIdFilter(id));
  return result.deletedCount > 0;
}