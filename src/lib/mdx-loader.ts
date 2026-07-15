import { getEntryBySlug } from './wikiContent';

export interface MdxData {
  frontmatter: Record<string, any>;
  content: string;
}

export async function loadMdxFile(category: string, slug: string): Promise<MdxData> {
  const entry = getEntryBySlug(slug);

  if (!entry) {
    throw new Error(`Статтю не знайдено: ${category}/${slug}`);
  }

  return {
    frontmatter: {
      title: entry.title,
      description: entry.description,
      category: entry.category,
      authors: entry.authors,
      date: entry.date,
      preview: entry.preview,
      image: entry.image,
      icon: entry.icon,
      label: entry.label,
      rarity: entry.rarity,
      tags: entry.tags,
      'also-on': entry.alsoOn,
    },
    content: entry.content,
  };
}