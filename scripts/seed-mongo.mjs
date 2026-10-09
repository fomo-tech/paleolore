import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MongoClient } from "mongodb";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const referenceSite = JSON.parse(await readFile(path.join(root, "data/reference-site.json"), "utf8"));
const editorialContent = JSON.parse(await readFile(path.join(root, "data/editorial-content.json"), "utf8"));
const editorialBySlug = new Map(editorialContent.articles.map((article) => [article.slug, article]));

function readingTime(content) {
  return Math.max(3, Math.ceil(content.split(/\s+/).filter(Boolean).length / 190)) + " min read";
}

const articles = referenceSite.articles.map((sourceArticle, index) => {
  const editorial = editorialBySlug.get(sourceArticle.slug);
  const content = editorial?.content || "This archive entry is awaiting an original editorial note.";
  return {
    slug: sourceArticle.slug,
    title: sourceArticle.title,
    excerpt: editorial?.excerpt || content,
    content,
    category: sourceArticle.category,
    categorySlug: sourceArticle.categorySlug,
    era: sourceArticle.era,
    date: sourceArticle.date,
    readingTime: editorial ? readingTime(content) : "1 min read",
    author: "The Archaeologist Editorial Desk",
    image: sourceArticle.image,
    sourceUrl: sourceArticle.sourceUrl,
    sourceImageUrl: sourceArticle.sourceImageUrl,
    featured: index === 0,
    status: "published",
  };
});

const uri = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const databaseName = process.env.MONGODB_DATABASE || process.env.MONGO_DATABASE || "archaeologist";
const collectionName = process.env.MONGODB_COLLECTION || "articles";
const client = new MongoClient(uri);

try {
  await client.connect();
  const collection = client.db(databaseName).collection(collectionName);
  const result = await collection.bulkWrite(
    articles.map((article) => ({
      updateOne: {
        filter: { slug: article.slug },
        update: { $setOnInsert: article },
        upsert: true,
      },
    })),
    { ordered: false },
  );
  console.log(JSON.stringify({
    database: databaseName,
    collection: collectionName,
    sourceArticles: articles.length,
    inserted: result.upsertedCount,
    alreadyPresent: result.matchedCount,
  }, null, 2));
} finally {
  await client.close();
}
