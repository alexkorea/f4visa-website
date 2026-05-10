import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string
  content: string
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(markdown)
  return result.toString()
}

function readPost(filePath: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const slug = path.basename(filePath).replace(/\.md$/, '')
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      category: data.category || '',
      excerpt: data.excerpt || '',
      image: data.image || '/slides/documents.jpg',
      content,
    }
  } catch {
    return null
  }
}

export async function getPostSlugs(): Promise<string[]> {
  try {
    return fs.readdirSync(CONTENT_DIR)
      .filter(f => f.endsWith('.md') && !f.includes('.'))
      .map(f => f.replace(/\.md$/, ''))
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`)
  const post = readPost(filePath)
  if (!post) return null
  post.content = await markdownToHtml(post.content)
  return post
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const files = fs.readdirSync(CONTENT_DIR)
      .filter(f => f.endsWith('.md') && !f.includes('.en.') && !f.includes('.zh.') && !f.includes('.ja.'))
    const posts = files
      .map(f => readPost(path.join(CONTENT_DIR, f)))
      .filter((p): p is BlogPost => p !== null)
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    return posts
  } catch {
    return []
  }
}
