/**
 * Cloudflare Pages(direct upload) 배포용 번들 조립 스크립트 — f4visa-pages.
 *
 * `opennextjs-cloudflare build` 는 워커를 .open-next/worker.js 에 두고
 * .open-next/assets 는 정적자산만 남긴다. Pages 는 assets/_worker.js 규약을 쓰므로
 * 이 조립 단계를 건너뛰고 assets 를 그대로 올리면 전 라우트가 404 가 된다.
 *
 * 사용: node scripts/build-pages-bundle.mjs   (opennextjs-cloudflare build 이후)
 * 배포: cd .open-next/assets && wrangler pages deploy . --project-name=f4visa-pages --branch=main
 *       배포 직후 반드시: bash /Users/mac4/scripts/deploy-done-auto.sh f4visa
 *       (배포 완료 기준 = n8n 독립검증 PASS. 봇 자기보고는 완료가 아니다. 맥7 20260922-1425)
 *
 * _routes.json 은 public/_routes.json 이 그대로 복사되므로 여기서 건드리지 않는다.
 */
import fs from 'node:fs'
import path from 'node:path'

// ── CH-01: HTML 문서에 장기 s-maxage 가 실려 나가는 것을 차단한다 ──────────────
// Next 는 프리렌더된 페이지 응답에 `Cache-Control: s-maxage=31536000`(1년) 을 붙인다.
// Pages 의 `_headers` 는 정적자산에만 적용되고 `_worker.js` 응답에는 적용되지 않으므로
// 워커 출구에서 직접 덮어쓴다. 정적자산은 `_routes.json` exclude 로 워커를 아예
// 거치지 않으므로 장기 immutable 캐시는 그대로 유지된다.
// ISR 의 짧은 s-maxage(예: s-maxage=2)는 의도된 값이라 건드리지 않는다.
const WORKER_WRAPPER = `import opennextWorker from "./_worker-opennext.js";
export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "./_worker-opennext.js";

const HTML_CACHE_CONTROL = "public, max-age=0, must-revalidate";
const LONG_S_MAXAGE_SECONDS = 60;
const BODYLESS_STATUS = new Set([101, 204, 205, 304]);

export default {
  async fetch(request, env, ctx) {
    const response = await opennextWorker.fetch(request, env, ctx);
    if (!(response.headers.get("content-type") || "").includes("text/html")) return response;
    if (BODYLESS_STATUS.has(response.status)) return response;
    const match = /s-maxage=(\\d+)/i.exec(response.headers.get("cache-control") || "");
    if (!match || Number(match[1]) <= LONG_S_MAXAGE_SECONDS) return response;
    const patched = new Response(response.body, response);
    patched.headers.set("cache-control", HTML_CACHE_CONTROL);
    return patched;
  },
};
`

const ROOT = process.cwd()
const OUT = path.join(ROOT, '.open-next')
const ASSETS = path.join(OUT, 'assets')

if (!fs.existsSync(path.join(OUT, 'worker.js'))) {
  console.error('.open-next/worker.js 없음 — 먼저 `npx opennextjs-cloudflare build` 실행')
  process.exit(1)
}

fs.copyFileSync(path.join(OUT, 'worker.js'), path.join(ASSETS, '_worker-opennext.js'))
fs.writeFileSync(path.join(ASSETS, '_worker.js'), WORKER_WRAPPER)

for (const dir of ['cloudflare', 'middleware', 'server-functions', '.build']) {
  const src = path.join(OUT, dir)
  if (!fs.existsSync(src)) continue
  fs.rmSync(path.join(ASSETS, dir), { recursive: true, force: true })
  fs.cpSync(src, path.join(ASSETS, dir), { recursive: true })
}

const cacheRoot = path.join(OUT, 'cache')
if (fs.existsSync(cacheRoot)) {
  const dest = path.join(ASSETS, 'cdn-cgi', '_next_cache')
  fs.rmSync(dest, { recursive: true, force: true })
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(cacheRoot)) {
    fs.cpSync(path.join(cacheRoot, entry), path.join(dest, entry), { recursive: true })
  }
}

if (!fs.existsSync(path.join(ASSETS, '_routes.json'))) {
  console.error('assets/_routes.json 없음 — public/_routes.json 확인 필요')
  process.exit(1)
}

console.log('Pages 번들 준비 완료 → .open-next/assets (_worker.js + cloudflare/middleware/server-functions + cdn-cgi/_next_cache)')
