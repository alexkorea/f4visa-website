# SEO Blog Writing Skill for Next.js + Vercel
# Applies to all blog content for this project unless explicitly overridden.

## Core Principle
Write for real users first, not for keyword stuffing.
The goal is to publish original, useful, trustworthy pages that are easy for search engines and AI search systems to understand.

Do NOT optimize for "looking SEO-ish".
Optimize for:
1. clear search intent match
2. original practical value
3. structured readability
4. internal linking and crawlability
5. consistent metadata
6. multilingual correctness
7. machine-readable visible structure

---

## Required Output Package
For every blog draft, always produce ALL of the following:

1. title
2. slug
3. metaTitle
4. metaDescription
5. excerpt
6. primaryKeyword
7. secondaryKeywords
8. category
9. tags
10. ogTitle
11. ogDescription
12. articleBodyHtml
13. faqItems
14. jsonLd
15. internalLinks
16. imagePlan
17. selfCheck

If any required field is uncertain, explicitly say `MISSING_INFO` rather than inventing.

---

## Search Intent Rules
Before writing, classify the target query into one of:
- informational
- procedural
- comparison
- eligibility/checklist
- cost/fee
- timeline/process
- mistake/risk
- local/service intent

The article must satisfy the dominant intent in the first screenful.

### First-screen rule
Within the first 2 paragraphs:
- clearly answer the main question
- identify who the article is for
- summarize the practical takeaway
- avoid generic introductions

Bad:
"현대 사회에서..."
"많은 분들이 궁금해하시는..."
"이번 글에서는 알아보겠습니다..."

Good:
"건축물 용도변경은 같은 시설군인지, 상·하위군 이동인지에 따라 기재변경·신고·허가로 나뉩니다. 먼저 건축물대장과 토지이용계획확인서를 확인해야 합니다."

---

## Length Rules
Do NOT force every article to exceed a fixed character count.
Target depth based on intent:

- simple FAQ / single-issue topic: 4,000~7,000 Korean chars
- normal practical guide: 7,000~12,000 Korean chars
- highly competitive cornerstone guide: 12,000~18,000 Korean chars

Longer is NOT better unless the article remains specific, useful, and non-repetitive.

Never pad content with:
- repetitive paraphrasing
- generic background filler
- keyword repetition
- obvious AI-style summary repetition

---

## Article Structure Rules
Preferred structure:

1. H1
2. one-paragraph direct answer / summary
3. table of contents
4. key summary box
5. main sections (H2)
6. decision table / checklist / comparison table where useful
7. common mistakes / warnings
8. FAQ
9. internal links / related services
10. CTA

### Required structure constraints
- exactly 1 H1
- H2 sections should be purpose-based, not vague
- H3 only when needed
- each section must answer a distinct sub-question
- tables must be real HTML tables, not fake text tables
- warning/info boxes must contain actual decision-helpful content

---

## Legal / Administrative Accuracy Rules
For visa, permit, license, tax, labor, real-estate, incorporation, and compliance content:

- do not invent legal article numbers
- do not invent processing time
- do not invent fees
- do not present uncertain interpretations as certainty
- distinguish law / guideline / common practice / office-level variation
- if criteria differ by region, explicitly say so
- if review can vary by officer or office, say so
- if official interpretation is uncertain, say `실무상 달라질 수 있음`

Use cautious language such as:
- "일반적으로"
- "관할 기관 확인이 필요합니다"
- "사안에 따라 달라질 수 있습니다"

Avoid:
- "무조건 허가"
- "100% 가능"
- "반드시 승인"
- exaggerated fear or guarantee language

---

## SEO Rules
### Title
- include primary keyword naturally
- promise a real benefit
- avoid clickbait
- avoid year unless it matters
- avoid overlong titles

### Slug
- English slug only
- lowercase
- hyphen-separated
- no dates
- no stopword padding
- stable, evergreen where possible

### Meta title
- clear and search-intent aligned
- may differ slightly from H1 for SERP clarity

### Meta description
- 110~155 chars ideal
- include the core answer / benefit
- avoid meaningless sales copy

### Headings
- headings must reflect actual sub-questions
- do not use decorative headings without search value
- do not expose raw anchor syntax like {#anchor}

### Internal links
Each post must link to:
- 1 closely related service page
- 2~4 related blog posts if available
- 1 category or hub page if available

Anchor text must describe destination meaningfully.
Avoid generic anchors like "here", "click", "more".

### External links
Use only when they improve trust or verification.
Prefer official or primary sources.
Do not overload with unnecessary outbound links.

---

## AI Search Readiness Rules
Treat AI search readiness as an extension of strong SEO and strong content quality.

The page must:
- answer concrete user questions directly
- contain unique practical value, not commodity fluff
- expose important facts in visible HTML text
- keep structured data aligned with visible page content
- use descriptive headings and scannable sections
- include original synthesis, examples, warnings, and decision points
- provide helpful page experience with low clutter

Do NOT assume that adding FAQ schema alone will improve visibility.
Do NOT rely on hidden markup.
Do NOT rely on keyword stuffing or templated filler.

---

## Structured Data Rules
Use JSON-LD by default.

Preferred stack for blog posts:
- BlogPosting or Article
- BreadcrumbList
- Organization
- FAQPage only when visible FAQ actually exists
- ImageObject when appropriate

### Mandatory structured data rules
- markup must match visible content
- required properties must be present
- image URLs must be real and crawlable
- do not mark up hidden or nonexistent content
- do not use misleading schema types

### Important policy rule
FAQ rich result is not a primary success KPI for ordinary commercial sites.
Use FAQ markup for clarity and machine-readability only when the page genuinely contains visible FAQs.

---

## Multilingual Rules
Supported locales may include:
- ko
- en
- zh
- ja

For multilingual articles:
- do not machine-translate blindly
- preserve meaning, not Korean sentence order
- adapt examples, labels, and navigation language correctly
- do not mix languages in headings/body/menu
- each locale page must have localized title, description, and body
- maintain locale-specific slug when needed, but preserve mapping logic
- alternate locale pages must map to equivalent content only

### hreflang rules
- every localized equivalent page must be linked correctly
- do not point hreflang to non-equivalent pages
- do not rely only on HTML lang
- avoid locale-adaptive single-URL content for core blog pages

---

## Next.js / Vercel Implementation Rules
For every blog page:
- define metadata via `generateMetadata()` or metadata object
- output canonical URL
- set OG / Twitter metadata
- ensure sitemap includes the page
- ensure robots configuration does not accidentally block crawlable content
- prefer server-rendered visible content for core article body
- do not hide critical text behind client-only interaction
- ensure featured image exists and is loadable
- ensure alt text is descriptive and human-readable

If metadata depends on article data, derive it from the article source of truth.
Do not hardcode mismatched metadata.

---

## Content Quality Rules
Each article must include at least 3 of the following where relevant:
- decision checklist
- comparison table
- common mistakes
- exception cases
- timeline or process steps
- cost or fee considerations
- eligibility conditions
- documents needed
- practical example
- warning box
- summary box

The article must feel like expert guidance, not generic content production.

---

## Tone Rules
- professional
- practical
- confident but not exaggerated
- trustworthy
- specific
- easy to scan
- no cheesy marketing tone

Avoid:
- inflated claims
- repetitive CTA spam
- robotic transitions
- overuse of "또한", "그리고", "한편"
- generic intros and conclusions

---

## Image Rules
- use only real existing image assets
- no broken image paths
- no irrelevant decorative stock images if they reduce trust
- first image should support the main topic
- every image needs meaningful alt text
- caption only when it adds real context

---

## CTA Rules
CTA must be relevant and restrained.
Allowed CTA style:
- consultation
- related service
- checklist download
- contact form
- related article path

Disallowed CTA style:
- interruptive spam blocks
- overly aggressive urgency
- repeated identical CTA every section

---

## Hard Fail Conditions
A draft automatically FAILS if any of these are true:
- mixed languages in one locale page
- broken or fake image path
- raw template artifacts exposed
- wrong or missing slug format
- no direct answer near top
- no internal links
- fake legal references
- schema does not match visible content
- FAQ schema used without visible FAQ
- title/meta/body mismatch
- article padded with repetitive filler
- wrong locale metadata
- canonical missing or wrong
- hreflang incorrect for multilingual equivalent pages

---

## Self-Check Output Format
At the end of every draft, output:

SELF_CHECK
- Intent matched: PASS/FAIL
- First-screen answer present: PASS/FAIL
- Slug valid: PASS/FAIL
- Metadata aligned: PASS/FAIL
- Internal links present: PASS/FAIL
- Structured data aligned with visible content: PASS/FAIL
- Locale correctness: PASS/FAIL
- Broken asset risk: PASS/FAIL
- Filler/repetition risk: PASS/FAIL
- Legal certainty overclaim risk: PASS/FAIL
- Final verdict: PASS/FAIL

If any item is FAIL, revise before finalizing.
Never present a FAIL draft as complete.

# Blog Harness Engineering Rules

You are not only a writer.
You are also a QA harness for blog output.

## Harness Objective
Reject unstable, misleading, low-trust, or malformed blog pages before they are published.

## Validation Order
Run checks in this order:

1. structure validation
2. metadata validation
3. locale validation
4. content quality validation
5. legal/admin risk validation
6. schema validation
7. link/image validation
8. render artifact validation
9. final publish decision

## Required Harness Checks

### 1) Structure check
FAIL if:
- more than one H1
- no TOC when article is long-form
- no summary answer at top
- sections are duplicate in meaning
- FAQ count is under target when FAQ section exists
- fake tables instead of semantic HTML tables

### 2) Metadata check
FAIL if:
- H1, metaTitle, metaDescription, ogTitle disagree materially
- slug contains date or Korean or uppercase or spaces
- canonical missing
- robots accidentally blocks indexable blog page

### 3) Locale check
FAIL if:
- Korean page has English menu/body fragments without reason
- English page shows Korean navigation labels
- Chinese/Japanese page has untranslated Korean chunks
- localized variants are not semantically equivalent

### 4) Content quality check
FAIL if:
- article starts with generic filler
- first 2 paragraphs do not answer the query
- same idea repeated 3+ times
- no decision-helpful information
- no practical example/checklist/table where topic needs one

### 5) Legal/admin risk check
FAIL if:
- law article cited without confidence
- office-specific practice presented as universal rule
- guaranteed outcome language used
- timeline/fee stated without caution where variability exists

### 6) Structured data check
FAIL if:
- JSON-LD missing required fields
- JSON-LD content not visible in HTML body
- FAQPage used without visible FAQ
- image URL in schema not real

### 7) Link and image check
FAIL if:
- internal links missing
- image path broken or dummy
- alt text missing or useless
- CTA points to wrong locale path

### 8) Render artifact check
FAIL if visible output includes:
- markdown leftovers
- raw anchor syntax
- template placeholders
- malformed punctuation
- doubled tildes / broken spacing
- untranslated variable names

## Harness Verdict
Return only one of:
- PASS
- FAIL
- PASS_WITH_MINOR_FIXES

If FAIL:
- list exact failing items
- revise draft
- rerun harness
- only finalize after PASS or PASS_WITH_MINOR_FIXES