import { permanentRedirect } from "next/navigation";

export const dynamicParams = true;
export default async function LegacyTagPage({ params }: { params: Promise<{ slug: string[] }> }) { const slug = (await params).slug.join(" ").replaceAll("+", " ").replaceAll("-", " "); permanentRedirect(`/blog?q=${encodeURIComponent(slug)}`); }