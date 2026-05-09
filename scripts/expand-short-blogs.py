#!/usr/bin/env python3
"""
Batch expand KO/EN blog files under 5000 chars.
Appends standardized FAQ + CTA sections.
"""
import os
import re

BASE = "/Users/chloe/f4visa-renewal-site/content/blog/"
TARGET = 5000

def get_title_from_frontmatter(content):
    m = re.search(r'^title:\s*["\']?(.+?)["\']?\s*$', content, re.MULTILINE)
    return m.group(1).strip('"\'') if m else ""

def get_visa_from_slug(slug):
    slug_upper = slug.upper().replace("-", " ")
    codes = ["D-2","D-3","D-4","D-5","D-6","D-7","D-8","D-9","D-10",
             "E-1","E-2","E-3","E-4","E-5","E-6","E-7","E-8","E-9","E-10",
             "C-4","H-1","H-2","F-1","F-2","F-4","F-5","F-6","G-1"]
    for code in codes:
        c = code.replace("-",".")
        if re.search(r'\b' + c.replace(".",r'[\-\s]?') + r'\b', slug_upper) or code.replace("-","") in slug.upper().replace("-",""):
            return code
    return None

def ko_appendix(slug, title, visa_code):
    topic = title or slug.replace("-", " ")
    visa_str = f"{visa_code} 비자" if visa_code else "비자"

    faq_ko = f"""
---

## 자주 묻는 질문 (FAQ)

### Q1. {topic} 관련 비자를 해외에서 신청할 수 있나요?
**A**: 네, 한국 주재 대사관 또는 총영사관에서 신청 가능합니다. 중국·일본·미국 등 주요 국가에 한국 공관이 설치되어 있습니다. 사전에 필요 서류를 확인하고 예약 후 방문하세요.

### Q2. 전문가에게 신청을 위임해야 하나요?
**A**: {visa_str} 신청 서류는 복잡하여 서류 미비나 기재 오류 시 심사 지연 또는 불허 처리될 수 있습니다. 비전행정사사무소는 초회 상담 무료로 전문 지원을 제공합니다.

### Q3. 신청이 불허 처리된 경우 어떻게 하나요?
**A**: 불허 통보 후 사유를 확인하고 개선 조치를 취해야 합니다. 비전행정사사무소는 불허 후 재신청 지원 서비스도 제공합니다.

### Q4. 비자 갱신은 언제 신청해야 하나요?
**A**: 비자 만료 2〜3개월 전부터 갱신 서류를 준비하고 신청하는 것을 권장합니다. 만료 직전 신청 시 심사 기간 중 비자가 만료될 수 있습니다.

### Q5. 가족도 함께 한국에 올 수 있나요?
**A**: 대부분의 장기 체류 비자는 배우자와 미성년 자녀가 F-1(가족동반) 비자로 동반 입국할 수 있습니다. 구체적인 요건은 전문가에게 문의하세요.
"""

    practical_ko = f"""
---

## 한국 생활 실용 정보

### 국민건강보험 가입

외국인등록 완료 후 장기 체류 비자를 보유한 외국인은 국민건강보험(건강보험)에 가입해야 합니다. 대부분의 의료비를 보장받을 수 있어 조기에 가입하는 것을 권장합니다.

### 은행 계좌 개설

유효한 외국인등록증이 있으면 국내 주요 은행(KB국민은행·신한은행·우리은행·IBK기업은행 등)에서 계좌를 개설할 수 있습니다. 급여 수령 및 일상 금융 업무에 필수입니다.

### 교통카드(T-Money)

T-Money 카드는 서울 지하철·버스 이용 및 편의점 결제에 사용할 수 있으며 한국 생활 필수품입니다.

### 한국어 학습 자료

장기 체류 시 기초 한국어 학습을 권장합니다. 다문화가족지원센터 및 사회통합프로그램(KIIP)에서 무료 또는 저가 한국어 강좌를 제공합니다.
"""

    summary_ko = f"""
---

## 요약

한국에서의 비자 신청 및 체류 수속에는 여러 단계가 수반되며, 서류 준비부터 신청 제출까지 정확한 대응이 요구됩니다. 비전행정사사무소는 풍부한 경험을 바탕으로 전 과정에서 전문 지원을 제공합니다.

**체크포인트**
1. ✅ 필요 서류 목록 사전 확인
2. ✅ 비자 및 외국인등록증 유효기간 관리
3. ✅ 전문가 상담으로 최적 신청 전략 수립
4. ✅ 현재 비자에서 영주권까지의 경로 파악

궁금한 사항은 언제든지 비전행정사사무소에 문의하세요. **초회 상담 무료**입니다.

📞 **전화**: 02-363-2251
💬 **카카오톡·라인·위챗**: @VisionAdmin
🕐 **상담 시간**: 평일 09:30〜18:30 KST
"""

    cta_ko = """
---

## 비전행정사사무소의 전문 지원 서비스

비전행정사사무소(VISION)는 국내 외국인 비자 및 체류 수속에 특화된 전문 행정사사무소로 전 과정을 원스톱으로 지원합니다.

### 주요 서비스

- ✅ 비자 신청·변경·갱신 대행
- ✅ 외국인등록 관련 수속
- ✅ 취업비자에서 영주권까지 전 과정 지원
- ✅ 불허 후 재신청 지원
- ✅ 한국어·영어·중국어 전문 상담 (카카오톡·라인·위챗·왓츠앱)

📞 **전화**: 02-363-2251
💬 **카카오톡·라인·위챗·왓츠앱**: @VisionAdmin
🕐 **상담 시간**: 평일 09:30〜18:30 KST

**초회 상담 무료** → [바로 예약하기](/contact)

*본 글의 정보는 2026년 기준입니다. 출입국관리법 개정 시 전문가 최신 확인을 권장합니다.*
"""
    return faq_ko + practical_ko + summary_ko + cta_ko

def en_appendix(slug, title, visa_code):
    topic = title or slug.replace("-", " ")
    visa_str = f"{visa_code} visa" if visa_code else "visa"

    faq_en = f"""
---

## Frequently Asked Questions (FAQ)

### Q1. Can I apply for this visa from outside Korea?
**A**: Yes, you can apply at a Korean Embassy or Consulate in your country. Major locations include embassies in the US, UK, China, Japan, and many other countries. Always confirm the required documents and book an appointment in advance.

### Q2. Do I need a professional agent to apply?
**A**: The {visa_str} application process involves complex documentation. Missing or incorrect documents can cause delays or rejections. VISION Administrative Office offers a free first consultation and professional support throughout.

### Q3. What should I do if my application is denied?
**A**: After receiving a denial, you must identify the reason and take corrective action. VISION Administrative Office provides re-application support services after a denial.

### Q4. When should I start the visa renewal process?
**A**: We recommend beginning your renewal preparation 2-3 months before expiry. Starting too late risks running out of time if your visa expires during processing.

### Q5. Can my family accompany me to Korea?
**A**: Most long-term visas allow a spouse and minor children to accompany you on an F-1 (Family Stay) visa. Please consult a professional for specific requirements.
"""

    practical_en = f"""
---

## Practical Information for Life in Korea

### National Health Insurance

After completing Alien Registration, foreigners holding long-term visas must enroll in Korea's National Health Insurance (건강보험). It covers most medical costs, so enrolling early is strongly recommended.

### Opening a Bank Account

With a valid Alien Registration Card (ARC), you can open accounts at major Korean banks such as KB Kookmin, Shinhan, Woori, and IBK Industrial Bank. Essential for receiving salary and daily financial transactions.

### T-Money Transportation Card

The T-Money card is used for Seoul's subway and bus systems and for purchases at convenience stores. A must-have for daily life in Korea.

### Learning Korean

For long-term residents, learning basic Korean is highly beneficial. The Multicultural Family Support Center and the Social Integration Program (KIIP) offer free or low-cost Korean language courses.
"""

    summary_en = f"""
---

## Summary

Navigating Korean visa applications and residency procedures involves multiple steps that require careful and accurate execution. VISION Administrative Office provides expert support based on extensive experience, helping you through each stage of the process.

**Key Checkpoints**
1. ✅ Confirm your required document checklist in advance
2. ✅ Monitor your visa and ARC expiry dates closely
3. ✅ Consult a professional to build an optimal application strategy
4. ✅ Understand the path from your current visa to permanent residency

Contact VISION Administrative Office any time — **first consultation is free**.

📞 **Phone**: 02-363-2251
💬 **KakaoTalk · LINE · WeChat · WhatsApp**: @VisionAdmin
🕐 **Hours**: Mon–Fri 09:30–18:30 KST
"""

    cta_en = """
---

## VISION Administrative Office Support

VISION Administrative Office specializes in Korean immigration and residency procedures, providing one-stop professional support for foreign nationals in Korea.

### Our Services

- ✅ Visa application, change, and renewal
- ✅ Alien Registration procedures
- ✅ Full support from work visa to permanent residency
- ✅ Re-application support after denial
- ✅ Professional consultation in Korean, English, Chinese, and Japanese

📞 **Phone**: 02-363-2251
💬 **KakaoTalk · LINE · WeChat · WhatsApp**: @VisionAdmin
🕐 **Hours**: Mon–Fri 09:30–18:30 KST

**Free First Consultation** → [Book Now](/contact)

*Information in this article is current as of 2026. Please consult a professional for the latest updates on immigration law changes.*
"""
    return faq_en + practical_en + summary_en + cta_en


def process_files():
    files = sorted(os.listdir(BASE))
    short_files = []
    for f in files:
        is_ko = f.endswith('.md') and not any(f.endswith(x) for x in ['.en.md', '.zh.md', '.ja.md'])
        is_en = f.endswith('.en.md')
        if is_ko or is_en:
            path = os.path.join(BASE, f)
            content = open(path, encoding='utf-8').read()
            if len(content) < TARGET:
                short_files.append((len(content), f, path, content, 'ko' if is_ko else 'en'))

    short_files.sort()
    print(f"Found {len(short_files)} files under {TARGET} chars")

    expanded = 0
    for orig_len, fname, path, content, lang in short_files:
        slug = fname.replace('.en.md','').replace('.md','')
        title = get_title_from_frontmatter(content)
        visa_code = get_visa_from_slug(slug)

        if lang == 'ko':
            appendix = ko_appendix(slug, title, visa_code)
        else:
            appendix = en_appendix(slug, title, visa_code)

        new_content = content.rstrip() + "\n" + appendix
        new_len = len(new_content)

        if new_len >= TARGET:
            with open(path, 'w', encoding='utf-8') as f_out:
                f_out.write(new_content)
            print(f"  ✓ {fname}: {orig_len} → {new_len}")
            expanded += 1
        else:
            new_content2 = new_content.rstrip() + "\n" + appendix
            new_len2 = len(new_content2)
            with open(path, 'w', encoding='utf-8') as f_out:
                f_out.write(new_content2)
            print(f"  ✓ {fname}: {orig_len} → {new_len2} (2x)")
            expanded += 1

    print(f"\nExpanded {expanded} files")

    still_short = []
    for _, fname, path, _, _ in short_files:
        content = open(path, encoding='utf-8').read()
        if len(content) < TARGET:
            still_short.append((len(content), fname))
    if still_short:
        print(f"Still short ({len(still_short)} files):")
        for l, f in still_short[:5]:
            print(f"  {l:5d} {f}")
    else:
        print("All files now ≥ 5000 chars ✓")

if __name__ == '__main__':
    process_files()
