import { mkdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const ORIGIN = "https://www.thearchaeologist.org";
const USER_AGENT = "Mozilla/5.0 (compatible; archaeology-site-import/1.0)";
const dataPath = join(ROOT, "data", "reference-site.json");
const imageDir = join(ROOT, "public", "reference", "articles");

await mkdir(join(ROOT, "data"), { recursive: true });
await mkdir(imageDir, { recursive: true });

function decodeHtml(value = "") {
  return value
    .replace(/&#39;|&#x27;/gi, "'")
    .replace(/&quot;|&#x22;/gi, '"')
    .replace(/&amp;/gi, "&")
    .replace(/&nbsp;/gi, " ")
    .replace(/&ndash;/gi, "–")
    .replace(/&mdash;/gi, "—")
    .replace(/&rsquo;|&#8217;/gi, "’")
    .replace(/&ldquo;|&#8220;/gi, "“")
    .replace(/&rdquo;|&#8221;/gi, "”")
    .replace(/&hellip;/gi, "…")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function cleanText(value = "") {
  return decodeHtml(value.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")).trim();
}

function attrs(tag) {
  const output = {};
  for (const match of tag.matchAll(/([:\w-]+)\s*=\s*["']([^"']*)["']/g)) output[match[1].toLowerCase()] = decodeHtml(match[2]);
  return output;
}

function absoluteUrl(value, base = ORIGIN) {
  if (!value) return null;
  try { return new URL(value, base).toString(); } catch { return null; }
}

function extractMeta(html) {
  const meta = {};
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const values = attrs(match[0]);
    const key = values.property || values.name || values.itemprop;
    if (key && values.content) meta[key.toLowerCase()] = values.content;
  }
  return meta;
}

function extractFirst(html, expression) {
  const match = html.match(expression);
  return match ? cleanText(match[1]) : "";
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "user-agent": USER_AGENT } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  return response.text();
}

async function downloadImage(url, slug) {
  const response = await fetch(url, { headers: { "user-agent": USER_AGENT } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for image ${url}`);
  const contentType = response.headers.get("content-type") || "image/jpeg";
  const ext = contentType.includes("png") ? ".png" : contentType.includes("webp") ? ".webp" : contentType.includes("gif") ? ".gif" : extname(new URL(url).pathname).toLowerCase() || ".jpg";
  const fileName = `${slug}${ext}`;
  await writeFile(join(imageDir, fileName), Buffer.from(await response.arrayBuffer()));
  return `/reference/articles/${fileName}`;
}

const homepage = await fetchText(`${ORIGIN}/`);
const articleLinks = [];
for (const match of homepage.matchAll(/href=["'](\/blog\/(?!category\/)[^\/"'?#]+)["']/gi)) {
  const path = match[1];
  if (!articleLinks.includes(path)) articleLinks.push(path);
}

const homepageMeta = extractMeta(homepage);
const siteImages = [];
for (const match of homepage.matchAll(/<img\b[^>]*>/gi)) {
  const values = attrs(match[0]);
  const src = absoluteUrl(values.src || values["data-src"] || values["data-image"]);
  if (src && !siteImages.includes(src)) siteImages.push(src);
}

const articles = [];
for (const [index, path] of articleLinks.entries()) {
  const url = absoluteUrl(path);
  try {
    const html = await fetchText(url);
    const meta = extractMeta(html);
    const title = extractFirst(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || meta["og:title"] || path.split("/").pop();
    const description = cleanText(meta["og:description"] || "");
    const paragraphs = [...html.matchAll(/<p\b[^>]*style=["'][^"']*white-space:\s*pre-wrap[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi)]
      .map((match) => cleanText(match[1]))
      .filter((text) => text.length > 20);
    const content = paragraphs.length ? paragraphs.join("\n\n") : description;
    const imageUrl = absoluteUrl(meta["og:image"] || "");
    const normalizedContent = content.replace(/\n\nPowered by The archaeologist\s*$/i, "");
    const datePublished = (html.match(/"datePublished"\s*:\s*"([^"]+)"/i) || [])[1] || meta["article:published_time"] || "";
    const author = (html.match(/"author"\s*:\s*"([^"]+)"/i) || [])[1] || "The Archaeologist";
    const slug = path.split("/").filter(Boolean).pop();
    const words = normalizedContent.split(/\s+/).filter(Boolean).length;
    let localImage = "";
    if (imageUrl) {
      try { localImage = await downloadImage(imageUrl.replace(/^http:/, "https:"), slug); } catch (error) { console.warn(`Image skipped for ${slug}: ${error.message}`); }
    }
    articles.push({
      slug,
      title: decodeHtml(title),
      excerpt: (description || normalizedContent).slice(0, 280).trim(),
      content: normalizedContent,
      category: "Latest Discoveries",
      categorySlug: "latest-discoveries",
      categories: [],
      era: "Archaeology",
      date: formatDate(datePublished),
      readingTime: `${Math.max(4, Math.ceil(words / 220))} min read`,
      author: decodeHtml(author),
      status: "published",
      image: localImage,
      sourceUrl: url,
      sourceImageUrl: imageUrl,
    });
    console.log(`[${index + 1}/${articleLinks.length}] ${slug}`);
  } catch (error) {
    console.warn(`Article skipped ${url}: ${error.message}`);
  }
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toISOString().slice(0, 10);
}

const categories = [
  { name: "Latest Discoveries", slug: "latest-discoveries", eyebrow: "DISCOVERIES" },
  { name: "Archaeology's Greatest Finds", slug: "archaeology-greatest-finds", eyebrow: "DISCOVERIES" },
  { name: "Philosophy", slug: "philosophy", eyebrow: "PHILOSOPHY" },
  { name: "Paleontology", slug: "paleontology", eyebrow: "DEEP TIME" },
  { name: "Underwater Discoveries", slug: "underwater-discoveries", eyebrow: "DISCOVERIES" },
  { name: "History", slug: "history", eyebrow: "HISTORY" },
  { name: "Lost Cities", slug: "lost-cities", eyebrow: "CIVILIZATIONS" },
  { name: "Religions", slug: "religions", eyebrow: "HISTORY" },
  { name: "Greatest Inventions", slug: "greatest-inventions", eyebrow: "ARTIFACTS" },
];
await writeFile(dataPath, JSON.stringify({
  source: ORIGIN,
  crawledAt: new Date().toISOString(),
  site: {
    title: decodeHtml(homepageMeta["og:site_name"] || "The Archaeologist"),
    description: cleanText(homepageMeta.description || homepageMeta["og:description"] || ""),
    imageCount: siteImages.length,
  },
  categories,
  articles,
}, null, 2));
console.log(`Saved ${articles.length} articles and ${siteImages.length} homepage image references to ${dataPath}`);
