/**
 * Migration script: reads .md files from content/blog/ and upserts to Supabase f4visa_blog_posts table.
 *
 * Usage:
 *   npx tsx scripts/migrate-blog-to-supabase.ts          # real run
 *   npx tsx scripts/migrate-blog-to-supabase.ts --dry     # dry run (no writes)
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY!
const TABLE = 'f4visa_blog_posts'
const BLOG_DIR = path.resolve(__dirname, '..', 'content', 'blog')

const DRY = process.argv.includes('--dry')

interface PostRow {
  slug: string
  locale: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string
  content_html: string
  content_md: string
}

async function mdToHtml(md: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(md)
  return result.toString()
}

async function main() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in .env.local')
    process.exit(1)
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))
  console.log(`Found ${files.length} markdown files in ${BLOG_DIR}`)

  const rows: PostRow[] = []

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file)
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    const slug = data.slug || file.replace('.md', '')
    const html = await mdToHtml(content)
    const date =
      typeof data.date === 'string'
        ? data.date
        : new Date(data.date).toISOString().slice(0, 10)

    rows.push({
      slug,
      locale: 'ko',
      title: data.title || slug,
      date,
      category: data.category || '',
      excerpt: data.excerpt || '',
      image: data.image || '/slides/documents.jpg',
      content_html: html,
      content_md: content,
    })
  }

  if (DRY) {
    console.log('\n=== DRY RUN ===')
    for (const r of rows) {
      console.log(`  [${r.locale}] ${r.slug} — ${r.title} (${r.date}) — HTML ${r.content_html.length} chars`)
    }
    console.log(`\nTotal: ${rows.length} posts would be upserted.`)
    return
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { data, error } = await supabase
    .from(TABLE)
    .upsert(rows, { onConflict: 'slug,locale' })
    .select('slug')

  if (error) {
    console.error('Upsert error:', error.message)
    process.exit(1)
  }

  console.log(`\nSuccessfully upserted ${data?.length ?? 0} posts to ${TABLE}.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
