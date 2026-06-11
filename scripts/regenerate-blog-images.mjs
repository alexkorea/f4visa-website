// F-4 비자 블로그 포스트 주제별 Pexels 이미지 생성·교체 (보스 16475·16476, 2026-06-11).

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = "/Users/chloe/f4visa-renewal-site";
const CONTENT = join(ROOT, "content/blog");
const PUBLIC_BLOG = join(ROOT, "public/blog");
const PEXELS_KEY = readFileSync("/Users/chloe/secrets/pexels_api_key.txt", "utf-8").trim();

if (!existsSync(PUBLIC_BLOG)) mkdirSync(PUBLIC_BLOG, { recursive: true });

// F-4 비자 주제 키워드 매핑 (다양한 Pexels 검색 쿼리)
const TOPIC_KEYWORDS = [
  { match: /거소증|domestic.*residence|registration card/i, q: "korean residence card document" },
  { match: /신청|application|apply/i, q: "office paperwork application korean" },
  { match: /발급|issued|issue/i, q: "passport issuance document desk" },
  { match: /연장|renewal|extend/i, q: "calendar deadline document korean" },
  { match: /자격|eligibility|qualification/i, q: "consultation interview professional" },
  { match: /외국국적|foreign nationality/i, q: "international passport multiple flags" },
  { match: /이중국적|dual nationality/i, q: "passport documents korean american" },
  { match: /국적|nationality|citizenship/i, q: "korean flag patriotic" },
  { match: /재외동포|overseas korean|diaspora/i, q: "korean family overseas immigration" },
  { match: /3세대|3rd generation|3대/i, q: "korean family multigenerational portrait" },
  { match: /4세대|4th generation/i, q: "young asian family korean" },
  { match: /F-?5|영주권|permanent/i, q: "permanent residency document official" },
  { match: /국내거소신고|address.*report|체류지/i, q: "korean apartment building seoul" },
  { match: /병역|military service/i, q: "korean military uniform serious" },
  { match: /범죄|criminal|background check/i, q: "police document fingerprint" },
  { match: /범죄경력|criminal record/i, q: "police certificate document" },
  { match: /제적|family registry|호적/i, q: "old korean document genealogy paper" },
  { match: /본인.*확인|identity verification/i, q: "id card identity check korean" },
  { match: /증명서|certificate/i, q: "official certificate document seal" },
  { match: /번역|translation|notarization/i, q: "translation document multilingual" },
  { match: /공증|notarized/i, q: "notary public stamp seal" },
  { match: /HiKorea|hi.korea/i, q: "computer screen application korean website" },
  { match: /출입국|immigration office/i, q: "immigration office korea building" },
  { match: /보고서|report/i, q: "report document file folder" },
  { match: /투자|invest/i, q: "korean stock market investment finance" },
  { match: /부동산|real estate/i, q: "korean apartment seoul property" },
  { match: /세금|tax|소득/i, q: "korean tax document calculator" },
  { match: /의료보험|insurance|health/i, q: "korean hospital insurance card" },
  { match: /운전면허|driver.*license/i, q: "driver license card asian" },
  { match: /은행|bank account/i, q: "korean bank seoul finance" },
  { match: /계약|contract/i, q: "contract signing pen office" },
  { match: /자녀|child|아이/i, q: "korean children family playing" },
  { match: /결혼|marriage|spouse/i, q: "korean wedding traditional couple" },
  { match: /유학|study abroad|education/i, q: "korean university student campus" },
  { match: /취업|employment|job/i, q: "korean office workplace meeting" },
  { match: /사업자|business|entrepreneur/i, q: "korean entrepreneur business office" },
  { match: /상속|inheritance|증여/i, q: "family heritage document elderly" },
  { match: /가족관계|family relations/i, q: "korean family portrait three generations" },
  { match: /행정사|administrative|법률/i, q: "korean lawyer consultation office" },
  { match: /해외|abroad|overseas/i, q: "international travel passport airport" },
  { match: /동포|kyopo|korean american/i, q: "korean american community gathering" },
  { match: /비자|visa/i, q: "passport visa stamp travel" },
  // fallback
  { match: /.*/, q: "korean office consultation professional" },
];

function pickKeyword(title) {
  for (const r of TOPIC_KEYWORDS) {
    if (r.match.test(title)) return r.q;
  }
  return "korean office consultation professional";
}

async function pexelsSearch(query, page = 1) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15&page=${page}&orientation=landscape`;
  const r = await fetch(url, { headers: { Authorization: PEXELS_KEY } });
  if (!r.ok) throw new Error(`Pexels HTTP ${r.status}`);
  const j = await r.json();
  return j.photos || [];
}

async function downloadImage(url, path) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`download HTTP ${r.status}`);
  const buf = await r.arrayBuffer();
  writeFileSync(path, Buffer.from(buf));
}

function updateFrontmatter(content, newImage) {
  const lines = content.split("\n");
  let inFm = false;
  let fmEnd = -1;
  let imgIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.trim() === "---") {
      if (!inFm) inFm = true;
      else { fmEnd = i; break; }
    } else if (inFm && /^image:\s*/.test(l)) {
      imgIdx = i;
    }
  }
  if (imgIdx >= 0) lines[imgIdx] = `image: "${newImage}"`;
  else if (fmEnd > 0) lines.splice(fmEnd, 0, `image: "${newImage}"`);
  return lines.join("\n");
}

const files = readdirSync(CONTENT).filter((f) => f.endsWith(".md"));
console.log(`Found ${files.length} blog posts`);

const usedPhotoIds = new Set();
const results = [];

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const filePath = join(CONTENT, file);
  const slug = file.replace(/\.md$/, "");
  const targetPath = join(PUBLIC_BLOG, `${slug}.jpg`);
  const webPath = `/blog/${slug}.jpg`;

  try {
    const content = readFileSync(filePath, "utf-8");
    const titleMatch = content.match(/^title:\s*"?(.+?)"?\s*$/m);
    const title = titleMatch ? titleMatch[1] : slug;
    const query = pickKeyword(title);

    let chosen = null;
    for (let page = 1; page <= 3 && !chosen; page++) {
      const photos = await pexelsSearch(query, page);
      for (const p of photos) {
        if (!usedPhotoIds.has(p.id)) {
          chosen = p;
          usedPhotoIds.add(p.id);
          break;
        }
      }
    }
    if (!chosen) {
      const photos = await pexelsSearch(query, 1);
      chosen = photos[0];
      if (!chosen) throw new Error("No Pexels result");
    }

    const dlUrl = chosen.src.large || chosen.src.original;
    await downloadImage(dlUrl, targetPath);

    const newContent = updateFrontmatter(content, webPath);
    writeFileSync(filePath, newContent, "utf-8");

    console.log(`[${i + 1}/${files.length}] ${slug} → ${query} (${chosen.id})`);
    results.push({ slug, query, photoId: chosen.id, ok: true });
  } catch (e) {
    console.error(`[${i + 1}/${files.length}] ${slug} FAIL: ${e.message}`);
    results.push({ slug, ok: false, error: e.message });
  }
  await new Promise((r) => setTimeout(r, 300));
}

const ok = results.filter((r) => r.ok).length;
console.log(`\nDone: ${ok}/${files.length} updated, ${results.length - ok} failed`);
writeFileSync(join(ROOT, "blog-image-regen-report.json"), JSON.stringify(results, null, 2));
