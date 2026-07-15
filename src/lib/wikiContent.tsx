import * as yaml from 'js-yaml';

export interface WikiEntry {
  slug: string;
  category: string;
  subcategory?: string;
  title: string;
  description: string;
  authors?: Array<{ name: string; mc?: string }>;
  date?: string;
  preview?: string;
  image?: string;
  icon?: string;
  label?: string;
  rarity?: string;
  tags?: string[];
  generateTOC?: boolean;
  content: string;
  alsoOn?: Array<{ name: string; url: string }>;
}

export interface WikiSubCategory {
  slug: string;
  parentCategory: string;
  title: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface WikiCategory {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  label: string;
  subtitle: string;
  subcategories: WikiSubCategory[];
}

const mdxFiles = (import.meta as any).glob(
  [
    '/src/content/wiki/**/*.mdx',
    '../content/wiki/**/*.mdx',
    './content/wiki/**/*.mdx',
    '/content/wiki/**/*.mdx'
  ],
  { query: '?raw', import: 'default', eager: true }
);

function parseEntries(): {
  entries: WikiEntry[];
  categories: WikiCategory[];
} {
  const entries: WikiEntry[] = [];
  const categoriesMap: Record<string, WikiCategory> = {};
  const subCategoriesMap: Record<string, WikiSubCategory[]> = {};

  for (const path in mdxFiles) {
    const rawContent = mdxFiles[path] as string;
    if (!rawContent || typeof rawContent !== 'string') continue;

    const parts = rawContent.split('---');
    if (parts.length < 3) continue;

    const frontmatterRaw = parts[1];
    const content = parts.slice(2).join('---').trim();

    let data: any = {};
    try {
      data = yaml.load(frontmatterRaw) || {};
    } catch (e) {
      console.error('YAML parse error in file:', path, e);
      continue;
    }

    // Визначаємо відносний шлях від папки content/wiki
    const wikiPos = path.indexOf('content/wiki/');
    const relativePath = wikiPos !== -1 ? path.substring(wikiPos + 'content/wiki/'.length) : path;
    const pathParts = relativePath.split('/');

    const fileName = pathParts[pathParts.length - 1].replace('.mdx', '');

    // 1. Головна категорія: content/wiki/items/index.mdx
    if (pathParts.length === 2 && fileName === 'index') {
      const categorySlug = pathParts[0];
      const iconMap: Record<string, string> = {
        items: 'netherite_sword',
        blocks: 'grass_block',
        entities: 'creeper_head',
        dimensions: 'end_portal_frame',
        structures: 'trial_chambers',
        cosmetics: 'totem_of_undying',
        systems: 'command_block',
      };

      categoriesMap[categorySlug] = {
        slug: data.slug || categorySlug,
        title: data.title || categorySlug,
        description: data.description || '',
        icon: data.icon || iconMap[categorySlug] || 'hn-cube',
        color: data.color || '#c5629a',
        label: data.title || categorySlug,
        subtitle: data.description || '',
        subcategories: [],
      };
    }
    // 2. Індекс підкатегорії: content/wiki/items/trinkets/index.mdx
    else if (pathParts.length === 3 && fileName === 'index') {
      const parentCategory = pathParts[0];
      const subSlug = pathParts[1];

      if (!subCategoriesMap[parentCategory]) {
        subCategoriesMap[parentCategory] = [];
      }

      subCategoriesMap[parentCategory].push({
        slug: data.slug || subSlug,
        parentCategory: parentCategory,
        title: data.title || subSlug,
        description: data.description || '',
        icon: data.icon || 'hn-folder',
        color: data.color || '#c5629a',
      });
    }
    // 3. Звичайний запис (наприклад items/trinkets/ring_speed.mdx або items/siga69-console.mdx)
    else if (fileName !== 'index') {
      // Завжди перша папка — це головна категорія (items)
      const parentCategory = pathParts[0];
      // Друга папка (якщо є) — це підкатегорія (trinkets)
      const subcategorySlug = pathParts.length > 2 ? pathParts[1] : undefined;

      entries.push({
        slug: fileName,
        category: parentCategory,
        subcategory: subcategorySlug,
        title: data.title || fileName,
        description: data.description || '',
        authors: data.authors,
        date: data.date ? new Date(data.date).toLocaleDateString('uk-UA') : undefined,
        preview: data.preview || data.image,
        image: data.preview || data.image,
        icon: data.icon,
        label: data.label,
        rarity: data.rarity,
        tags: data.tags,
        generateTOC: data.generateTOC,
        content: content,
        alsoOn: data['also-on'],
      });
    }
  }

  // Прив'язуємо підкатегорії до відповідних основних категорій
  Object.keys(categoriesMap).forEach((catSlug) => {
    if (subCategoriesMap[catSlug]) {
      categoriesMap[catSlug].subcategories = subCategoriesMap[catSlug];
    }
  });

  return { entries, categories: Object.values(categoriesMap) };
}

const { entries: wikiEntries, categories } = parseEntries();

export { wikiEntries, categories };

export function getEntriesByCategory(categorySlug: string): WikiEntry[] {
  return wikiEntries.filter((e) => e.category === categorySlug);
}

export function getEntryBySlug(slug: string): WikiEntry | undefined {
  return wikiEntries.find((e) => e.slug === slug);
}

export function getCategoryBySlug(slug: string): WikiCategory | undefined {
  return categories.find((c) => c.slug === slug);
}

export function searchEntries(query: string): WikiEntry[] {
  const q = query.toLowerCase();
  return wikiEntries.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      (e.tags && e.tags.some((t) => t.toLowerCase().includes(q)))
  );
}