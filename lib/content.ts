export type Article = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  era: string;
  date: string;
  readingTime: string;
  author: string;
  featured?: boolean;
  status?: "draft" | "published";
  seoTitle?: string;
  seoDescription?: string;
};

export const categories = [
  { name: "Latest Discoveries", slug: "latest-discoveries", eyebrow: "DISCOVERIES" },
  { name: "Human Prehistory", slug: "prehistory", eyebrow: "PREHISTORY" },
  { name: "Ancient Civilizations", slug: "civilizations", eyebrow: "CIVILIZATIONS" },
  { name: "Paleontology", slug: "paleontology", eyebrow: "DEEP TIME" },
  { name: "Artifacts & Technology", slug: "artifacts", eyebrow: "ARTIFACTS" },
];

export const sampleArticles: Article[] = [
  {
    slug: "dau-tich-lua-co-xua-trong-hang-da",
    title: "Ancient Fire Marks Reveal How Early Humans Survived Winter",
    excerpt: "A thin layer of ash, burned bone fragments and heat-cracked stones reopen the story of a prehistoric hearth.",
    content: "Inside a cave overlooking a dry valley, archaeologists found a band of sediment no wider than a hand. It made little impression at first: fine ash, discolored animal bones and small stones fractured by heat. Yet their arrangement showed that this was not a natural fire.\n\nThe hearth was rebuilt in the same place across several layers of soil. That suggests a group returned to the shelter season after season, carrying food, tools and a shared memory of a safe place.\n\nWhen archaeologists read a site like this, they do not ask only what was found. They also ask who kept the fire alive, where people sat and what small changes in the material can reveal about the climate around them. A tiny charcoal fragment can sometimes mark time more reliably than a story passed down by word of mouth.",
    category: "Human Prehistory", categorySlug: "prehistory", era: "Pleistocene", date: "08.10.2026", readingTime: "6 min read", author: "The Archaeologist Editorial Desk", featured: true, status: "published",
  },
  {
    slug: "thanh-pho-chim-duoi-long-dat",
    title: "The City Beneath the Ground and the Architecture of Adaptation",
    excerpt: "A chain of underground passages shows how ancient residents turned harsh geology into a living defense system.",
    content: "An underground city was not built simply to inspire wonder. It was a human answer to climate, conflict and the need to organize daily life inside a limited space.\n\nFood stores sit close to ventilation shafts, while narrow passages could control how many people entered or left. The evidence suggests that architecture was never separate from politics and survival.",
    category: "Ancient Civilizations", categorySlug: "civilizations", era: "Bronze Age", date: "06.10.2026", readingTime: "5 min read", author: "The Archaeologist Lab", status: "published",
  },
  {
    slug: "bo-xuong-thu-san-co-dai",
    title: "The Ancient Predator Skeleton That Reveals a Lost Ecosystem",
    excerpt: "From worn teeth to bite marks on bone, paleontology is rebuilding the food web of a vanished landscape.",
    content: "A fossil is not a still photograph of the past. Every worn surface, bite mark and mineral layer records an interaction. When researchers place these traces side by side, they can begin to imagine how an ecosystem once worked.",
    category: "Paleontology", categorySlug: "paleontology", era: "Miocene", date: "02.10.2026", readingTime: "4 min read", author: "The Archaeologist Lab", status: "published",
  },
  {
    slug: "ngon-ngu-cua-nhung-manh-gom",
    title: "The Language of Broken Pottery",
    excerpt: "A vessel does not need to be whole to speak about trade, ritual and the hands that shaped it.",
    content: "Pottery fragments are humble but persistent evidence. Patterns, clay, fingerprints and fire marks on a vessel form a material record of everyday life.",
    category: "Artifacts & Technology", categorySlug: "artifacts", era: "Iron Age", date: "28.09.2026", readingTime: "4 min read", author: "The Archaeologist Lab", status: "published",
  },
];

export function getCategory(slug: string) { return categories.find((category) => category.slug === slug); }