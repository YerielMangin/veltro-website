import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDir = path.join(process.cwd(), "src/content");

export interface ContentMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  image?: string;
  tags?: string[];
  published?: boolean;
  readingTime?: string;
}

export function getContentBySlug<T extends ContentMeta>(
  category: string,
  slug: string
): { meta: T; content: string } | null {
  const filePath = path.join(contentDir, category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    meta: { ...data, slug, readingTime: rt.text } as T,
    content,
  };
}

export function getAllContent<T extends ContentMeta>(category: string): T[] {
  const dir = path.join(contentDir, category);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const result = getContentBySlug<T>(category, slug);
      return result?.meta ?? null;
    })
    .filter((m): m is T => m !== null && m.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
