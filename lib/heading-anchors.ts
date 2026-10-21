// 블로그 본문 제목에 id 를 붙이고 목차(href="#…") 링크가 실제 제목으로 풀리게 한다 — QA1020-FIX3 F(맥7 10-21).
// remark-html 은 마크다운 제목(## …)에 id 를 만들지 않아 목차 링크가 원래부터 깨져 있었다(라이브 20편 162개).
// 원고는 그대로 두고 렌더 단계에서만 고친다.
//  1) 원고가 직접 쓴 id(<h2 id="section-1"> 등)는 손대지 않는다.
//  2) id 없는 h2~h4 중, 같은 글 목차가 가리키는데 페이지에 없는 앵커(#요건·#what-is·#section-3 …)는
//     링크 글자와 제목 글자가 같은(번호·기호 무시) 제목에 그 앵커를 id 로 준다 — 목차 href 는 원고 그대로.
//  3) 나머지 id 없는 제목은 GitHub 방식 slug(소문자, 문장부호 삭제, 공백 → '-')를 id 로 준다.
//     원고 목차 대부분이 이 slug 로 쓰여 있다(#2-개인사업자-등록-절차--단계별-안내).
//  4) 그래도 안 풀리는 목차 링크는 글자가 같은 제목(원고 id 가 있는 제목 포함)의 id 로 href 를 바꾼다.
// 제목 끝의 `{#요건}`(Pandoc 식 앵커)은 remark 가 글자로 내보내 화면에 그대로 보였다 → 떼어 내고 그 값을 id 로 쓴다.
// 목차 상자를 `<h3>목차` 처럼 닫지 않은 원고가 있어, 제목 안에 다른 제목 여는 태그가 끼면 제목으로 보지 않는다.

const HEADING = /<(h[2-4])(\s[^>]*)?>((?:(?!<h[1-6][\s>])[\s\S])*?)<\/\1>/g
const BRACE_ID = /\s*\{#([^}\s]+)\}\s*$/
const LINK = /<a\s([^>]*?)href="#([^"]*)"([^>]*)>([\s\S]*?)<\/a>/g

const ENT: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }
function text(s: string): string {
  return s
    .replace(/<!--[\s\S]*?-->|<[^>]+>/g, '')
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
      if (e[0] === '#') {
        const n = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)
        return Number.isFinite(n) ? String.fromCodePoint(n) : m
      }
      return ENT[e.toLowerCase()] ?? m
    })
    .trim()
}

// github-slugger 와 같은 규칙: 글자·숫자·결합부호·연결부호(_)·공백·하이픈만 남기고 공백을 '-' 로.
function slug(s: string): string {
  return s.toLowerCase().replace(/[^\p{L}\p{M}\p{N}\p{Pc} -]/gu, '').replace(/ /g, '-')
}

// 목차 글자와 제목 글자 대조용: 앞 번호("1." "2)" "Q3.")·문장부호·공백을 지운다.
function norm(s: string): string {
  return s
    .replace(/^\s*(?:Q\s*)?\d+(?:-\d+)?\s*[.)．、]?\s*/i, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, '')
}

// 글자 순서만 다른 목차(「FAQ 자주 묻는 질문」 ↔ 「자주 묻는 질문 FAQ」)도 같은 제목으로 본다.
function same(a: string, b: string): boolean {
  return !!a && (a === b || [...a].sort().join('') === [...b].sort().join(''))
}

function decode(h: string): string {
  try {
    return decodeURIComponent(text(h))
  } catch {
    return text(h)
  }
}

function attrId(attrs: string | undefined): string | null {
  const m = attrs && attrs.match(/\sid="([^"]*)"/)
  return m ? text(m[1]) : null
}

export function addHeadingAnchors(html: string): string {
  type H = { inner: string; body: string; id: string | null; own: boolean; key: string; sl: string }
  const heads: H[] = []
  for (const m of html.matchAll(HEADING)) {
    const brace = m[3].match(BRACE_ID)
    const body = brace ? m[3].slice(0, brace.index) : m[3]
    const t = text(body)
    const id = attrId(m[2])
    heads.push({ inner: m[3], body, id: id ?? (brace ? text(brace[1]) : null), own: id !== null, key: norm(t), sl: slug(t) })
  }
  if (!heads.length) return html

  const used = new Set<string>()
  for (const m of html.matchAll(/\sid="([^"]*)"/g)) used.add(text(m[1]))

  const links = [...html.matchAll(LINK)].map((m) => ({ target: decode(m[2]), key: norm(text(m[4])) }))

  // 2) 목차가 가리키는데 페이지에 없는 앵커 → 같은 글자의 id 없는 제목에 그 앵커를 준다.
  //    단, 그 앵커가 어떤 제목의 GitHub slug 와 같으면 3) 에서 그 제목이 받으므로 여기서 건드리지 않는다.
  const slugs = new Set(heads.filter((h) => !h.id).map((h) => h.sl))
  for (const l of links) {
    if (!l.target || used.has(l.target) || slugs.has(l.target) || !l.key) continue
    let cand = heads.filter((h) => !h.id && h.key === l.key)
    if (!cand.length) cand = heads.filter((h) => !h.id && same(h.key, l.key))
    if (cand.length !== 1) continue
    cand[0].id = l.target
    used.add(l.target)
  }

  // 3) 나머지 id 없는 제목에 GitHub slug. 같은 slug 가 또 나오면 -1, -2 …
  for (const h of heads) {
    if (h.id || !h.sl) continue
    let id = h.sl
    for (let n = 1; used.has(id); n++) id = `${h.sl}-${n}`
    h.id = id
    used.add(id)
  }

  let i = 0
  let out = html.replace(HEADING, (whole, tag: string, attrs: string | undefined, inner: string) => {
    const h = heads[i++]
    if (!h || h.inner !== inner || !h.id) return whole
    if (h.own) return h.body === inner ? whole : `<${tag}${attrs || ''}>${h.body}</${tag}>`
    return `<${tag}${attrs || ''} id="${h.id.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}">${h.body}</${tag}>`
  })

  // 4) 아직 안 풀리는 목차 링크는 글자가 같은 제목의 id 로.
  const ids = new Set<string>()
  for (const m of out.matchAll(/\sid="([^"]*)"/g)) ids.add(text(m[1]))
  out = out.replace(LINK, (whole, pre: string, href: string, post: string, inner: string) => {
    const target = decode(href)
    if (!target || ids.has(target)) return whole
    const key = norm(text(inner))
    let cand = key ? heads.filter((h) => h.id && h.key === key) : []
    if (key && !cand.length) cand = heads.filter((h) => h.id && same(h.key, key))
    if (cand.length !== 1) return whole
    return `<a ${pre}href="#${encodeURIComponent(cand[0].id as string)}"${post}>${inner}</a>`
  })
  return out
}
