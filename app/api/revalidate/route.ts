import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret') || request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.BLOG_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const slug = (body as { slug?: string }).slug

    revalidatePath('/blog', 'page')
    revalidatePath('/sitemap.xml')

    if (slug) {
      revalidatePath(`/blog/${slug}`, 'page')
    }

    return NextResponse.json({
      revalidated: true,
      slug: slug || null,
      paths: ['/blog', '/sitemap.xml', slug ? `/blog/${slug}` : null].filter(Boolean),
      now: Date.now(),
    })
  } catch (err) {
    return NextResponse.json({ error: 'Revalidation failed', detail: String(err) }, { status: 500 })
  }
}
