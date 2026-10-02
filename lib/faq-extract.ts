// 블로그 본문 HTML(화면에 그대로 나가는 것)에서 FAQ 문답을 뽑는다 → FAQPage JSON-LD 의 단일 원천.
// I3b(2026-10-03 맥7): FAQPage 는 화면 FAQ 와 1:1. 맥3 의 faq_jsonld_gen.py 와 같은 규칙을 옮기고 두 가지를 보탰다.
// (f4visa 사본: investkorea 판 + 변형 ⑤ div 칸형. 원고는 content/blog/*.md → lib/blog.ts 에서 HTML 로 바뀐 뒤 여기로 온다.)
//  - 질문 접두('Q1. ' 'Q：' '问：')와 답변 접두('A. ' 'A1:')만 떼고 나머지 글자는 그대로
//  - 변형 ① <h3>Q1. …</h3><p>…</p>  ② <p><strong>Q1. …</strong> A. …</p>  ③ <p><strong>Q. …</strong></p><p>답변</p>
//    ④ <p class="faq-q">Q. …</p><p class="faq-a">A. …</p>
//  - <details><summary> 형이 있으면 그것을 우선
//  - (보탬) FAQ 제목 h2 가 여럿이면 모든 섹션의 문답을 합친다(같은 질문은 1번). 문답이 0이면 FAQPage 를 내지 않는다.
//  - (보탬) 섹션 끝은 다음 h2. 문답 사이를 <hr> 로 나눈 원고가 있어 <hr> 에서 섹션을 끊지 않고, 답 수집만 멈춘다.
// 원고 안에 손으로 넣은 FAQPage <script> 는 splitFaq 가 걷어낸다(화면과 어긋난 사례가 있었다).

// 제목이 'FAQ/자주 묻는 질문' 류일 때만 FAQ 섹션으로 본다. 'よくある失敗'·'Frequently Applied …' 같은 제목을 FAQ 로 보면
// 그 아래 h3 소제목이 질문으로 둔갑한다(맥3 스크립트의 '추출 수 ≠ 화면 Q 수' 사례의 원인).
const FAQH = /FAQ|자주\s*묻는|Frequently\s+Asked|常见问题|常見問題|常见问答|常見問答|よくある(?:ご)?質問|Câu hỏi thường gặp|Часто задаваемые/i
const QP = /^\s*(?:Q\s*\d*\s*[.:：)）]|问\s*[：:]|\d+\s*[.)])\s*/
const AP = /^\s*(?:A\s*\d*\s*[.:：)）]|答\s*[：:])\s*/
const Q_PARA = /<p[^>]*>\s*<strong>\s*(?:Q\s*\d*\s*[.:：)）]|问\s*[：:])[\s\S]*?<\/strong>\s*<\/p>/

const ENT: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " }

function unescape(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const n = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)
      return Number.isFinite(n) ? String.fromCodePoint(n) : m
    }
    return ENT[e.toLowerCase()] ?? m
  })
}

function tx(s: string): string {
  return unescape(s.replace(/<!--[\s\S]*?-->|<[^>]+>/g, "")).replace(/\s+/g, " ").trim()
}

export type FaqItem = { q: string; a: string }

function section(sec: string): FaqItem[] {
  const out: FaqItem[] = []
  // 변형 ④: <div class="faq-item"><p class="faq-q">Q. …</p><p class="faq-a">A. …</p></div>
  for (const m of sec.matchAll(/<p[^>]*class="faq-q"[^>]*>([\s\S]*?)<\/p>\s*<p[^>]*class="faq-a"[^>]*>([\s\S]*?)<\/p>/g)) {
    const q = tx(m[1]).replace(QP, ""), a = tx(m[2]).replace(AP, "")
    if (q && a) out.push({ q, a })
  }
  if (out.length) return out
  // 변형 ⑤(f4visa): <div><strong>Q. …</strong></div><div>A. …</div> — 질문·답이 각각 칸(div) 하나
  for (const m of sec.matchAll(/<div[^>]*>\s*<strong>\s*((?:Q|问)[^<]*?)<\/strong>\s*<\/div>\s*<div[^>]*>((?:(?!<div\b)[\s\S])*?)<\/div>/g)) {
    const qt = tx(m[1])
    if (!QP.test(qt)) continue
    const q = qt.replace(QP, ""), a = tx(m[2]).replace(AP, "")
    if (q && a) out.push({ q, a })
  }
  if (out.length) return out
  // 변형 ②: 질문과 답이 한 문단
  for (const m of sec.matchAll(/<p[^>]*>\s*<strong>\s*((?:Q|问)[\s\S]*?)<\/strong>([\s\S]*?)<\/p>/g)) {
    const qt = tx(m[1])
    if (!QP.test(qt)) continue
    const q = qt.replace(QP, ""), a = tx(m[2]).replace(AP, "")
    if (q && a) out.push({ q, a })
  }
  if (out.length) return out

  // 변형 ①③: 질문 토큰 뒤 다음 질문 전까지의 <p> (목록·표·<hr>·굵은 안내 문단에서 멈춘다)
  // '<h3>Q: …</h3><h3>A: …</h3>' 처럼 답을 h3 로 쓴 글도 있다 → 앞 질문의 답으로 붙인다.
  const toks = sec.split(new RegExp(`(<h3[^>]*>[\\s\\S]*?<\\/h3>|${Q_PARA.source})`))
  // 질문에 'Q' 접두를 쓰는 섹션이면, 접두 없는 h3(문답 뒤 <hr> 다음의 안내 소제목 등)는 질문으로 보지 않는다.
  const qStyle = toks.some((x, i) => i % 2 === 1 && QP.test(tx(x)) && !AP.test(tx(x)))
  let pending: string | null = null
  for (let i = 1; i < toks.length; i += 2) {
    const t = tx(toks[i])
    if (qStyle && !QP.test(t) && !AP.test(t)) { pending = null; continue }
    if (pending && AP.test(t) && toks[i].startsWith("<h3")) {
      out.push({ q: pending, a: t.replace(AP, "") })
      pending = null
      continue
    }
    const q = t.replace(QP, "")
    const body = toks[i + 1] ?? ""
    const ps: string[] = []
    for (const blk of body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>|<(?:ol|ul|table|hr)\b/g)) {
      if (blk[1] === undefined) break
      const raw = blk[1]
      // 굵은 글씨만으로 된 문단(줄바꿈으로 이어진 <strong> 여러 개 포함) = 마지막 답 뒤 안내문, 답 아님
      if (/^\s*<strong>/.test(raw) && !raw.replace(/<strong>[^<]*<\/strong>|<br\s*\/?>|\s/g, "") && !/^\s*<strong>\s*Q/.test(raw)) break
      ps.push(tx(raw))
    }
    const a = ps.filter(Boolean).join(" ").replace(AP, "")
    pending = null
    if (q && a) out.push({ q, a })
    else if (q && QP.test(t)) pending = q
  }
  return out
}

export function extractFaq(html: string): FaqItem[] {
  const h = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "")
  const out: FaqItem[] = []
  for (const m of h.matchAll(/<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)) {
    const q = tx(m[1]).replace(/^\s*Q[\d.]*[.:)]?\s*/, "")
    const a = tx(m[2]).replace(AP, "")
    if (q && a) out.push({ q, a })
  }
  if (out.length) return out

  // FAQ 제목 h2 마다 그 섹션(다음 h2 전까지)을 읽어 모두 합친다 — 같은 글에 FAQ 블록이 둘인 원고가 있다(화면에 둘 다 보인다).
  // 같은 질문은 한 번만.
  const seen = new Set<string>()
  const h2 = /<h2[^>]*>([\s\S]*?)<\/h2>/g
  for (let m; (m = h2.exec(h)); ) {
    if (!FAQH.test(tx(m[1]))) continue
    const rest = h.slice(m.index + m[0].length)
    const nxt = rest.search(/<h2\b|<\/article>/)
    for (const it of section(nxt >= 0 ? rest.slice(0, nxt) : rest)) {
      if (seen.has(it.q)) continue
      seen.add(it.q)
      out.push(it)
    }
  }
  return out
}

const INLINE_FAQ_LD = /<script[^>]*type=["']application\/ld\+json["'][^>]*>(?:(?!<\/script>)[\s\S])*?"@type"\s*:\s*"FAQPage"[\s\S]*?<\/script>\s*/g

// 화면 FAQ 를 뽑았으면 본문 속 수기 FAQPage <script> 를 걷어내고 뽑은 것만 낸다(같은 쪽에 FAQPage 2개 금지).
// 못 뽑았으면 본문을 건드리지 않는다 — 그때는 수기 FAQPage 가 유일한 원천이다.
export function splitFaq(html: string): { html: string; faqs: FaqItem[] } {
  const faqs = extractFaq(html)
  if (!faqs.length) return { html, faqs }
  return { html: html.replace(INLINE_FAQ_LD, ""), faqs }
}
