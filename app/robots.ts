import type { MetadataRoute } from "next"

// 1SEO 3장(2026-11-12 task_mac4_34): 허용 봇을 한 그룹에 묶는다 — 이름 붙은 그룹은 * 의 disallow 를 물려받지 않는다.
// 실제 응답은 public/robots.txt 가 낸다 — 둘을 같게 둔다.
const ALLOWED_BOTS = [
  "*", "Googlebot", "Yeti", "bingbot", "Applebot", "YandexBot",
  "OAI-SearchBot", "ChatGPT-User", "GPTBot", "PerplexityBot", "Perplexity-User",
  "Claude-SearchBot", "Claude-User", "ClaudeBot", "anthropic-ai", "Google-Extended",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: ALLOWED_BOTS, allow: "/", disallow: ["/api/"] },
      { userAgent: "Amazonbot", disallow: "/" },
    ],
    sitemap: "https://www.f4visa.net/sitemap.xml",
    host: "https://www.f4visa.net",
  }
}
