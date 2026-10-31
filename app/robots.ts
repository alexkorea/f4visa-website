import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // NAVER-SEO-FIX-1031: 네이버 Yeti 명시(* 그룹을 대체하므로 disallow 그대로). 실제 응답은 public/robots.txt 가 낸다 — 둘을 같게 둔다.
      { userAgent: "Yeti", allow: "/", disallow: ["/api/"] },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
    ],
    sitemap: "https://www.f4visa.net/sitemap.xml",
    host: "https://www.f4visa.net",
  }
}
