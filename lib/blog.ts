import { getAnonClient } from '@/lib/supabase'

const TABLE = 'f4visa_blog_posts'

export interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string
  content: string
}

interface SupabaseBlogRow {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string
  content_html: string
  locale: string
}

function rowToPost(row: SupabaseBlogRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    date: row.date,
    category: row.category,
    excerpt: row.excerpt,
    image: row.image || '/slides/documents.jpg',
    content: row.content_html,
  }
}

export async function getPostSlugs(): Promise<string[]> {
  const supabase = getAnonClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select('slug')
    .eq('locale', 'ko')
    .order('date', { ascending: false })

  if (error) {
    console.error('getPostSlugs error:', error.message)
    return []
  }
  return (data ?? []).map((r: { slug: string }) => r.slug)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getAnonClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('locale', 'ko')
    .single()

  if (error || !data) {
    console.error('getPostBySlug error:', error?.message)
    return null
  }
  return rowToPost(data as SupabaseBlogRow)
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const supabase = getAnonClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('locale', 'ko')
    .order('date', { ascending: false })

  if (error) {
    console.error('getAllPosts error:', error.message)
    return []
  }
  return (data ?? []).map((r: SupabaseBlogRow) => rowToPost(r))
}
