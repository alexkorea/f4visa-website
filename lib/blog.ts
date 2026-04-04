import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string
  content: string
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return []
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace('.md', ''))
}

export function getPostBySlug(slug: string): BlogPost {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const processedContent = remark().use(remarkGfm).use(html, { sanitize: false }).processSync(content)
  return {
    slug: data.slug || slug,
    title: data.title,
    date:
      typeof data.date === 'string'
        ? data.date
        : new Date(data.date).toISOString().slice(0, 10),
    category: data.category,
    excerpt: data.excerpt,
    image: data.image || '/slides/documents.jpg',
    content: processedContent.toString(),
  }
}

export function getAllPosts(): BlogPost[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}
