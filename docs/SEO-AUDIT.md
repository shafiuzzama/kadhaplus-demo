# KadhaPlus — SEO Audit & Implementation Report

**Site:** https://kadhaplus.com  **Stack:** Next.js 14 (App Router), TypeScript, static-prerendered (all 20 routes `○ Static`).
**Scope of this pass:** code-level technical + on-page SEO and structured data, implemented and verified in a production build. Items needing your Google accounts or business confirmation are listed as **manual action items** — none were faked.

> Guardrails honoured: no invented search volumes, no fake reviews/ratings, no fabricated medical claims, no fabricated FSSAI/AYUSH/batch/barcode/manufacturer data. Product structured data matches the visible page.

---

## 1. Audit findings

### 🔴 Critical (fixed)
| # | Issue | Status |
|---|-------|--------|
| C1 | **Homepage had no `metadata`** — inherited only the layout default (no unique title/description/canonical/OG). | ✅ Added unique home metadata + canonical. |
| C2 | **Homepage had no `<h1>`** — hero is an image slider; every heading was an `<h2>`. | ✅ Added one descriptive, screen-reader `<h1>` (design unchanged). |
| C3 | **No structured data anywhere** (no Organization / Product / Offer / Breadcrumb / FAQ). | ✅ All implemented as JSON-LD (see §5). |
| C4 | **No per-page canonical tags** — duplicate-content risk. | ✅ Canonical added to every indexable page. |
| C5 | **Cart & Checkout were crawlable/indexable** (no `noindex`, not disallowed). | ✅ `noindex` layouts + `robots.txt` disallow. |

### 🟠 Important (fixed)
| # | Issue | Status |
|---|-------|--------|
| I1 | Per-page Open Graph / Twitter cards missing (only a site-wide default existed) and **no `og:image`**. | ✅ Per-page OG/Twitter + real product `og:image` (1536×1024). |
| I2 | `robots.txt` allowed everything; no sitemap `host`. | ✅ Disallow `/cart`, `/checkout`, `/api/`; added `host`. |
| I3 | Sitemap priorities flat (product = 0.7). | ✅ Home 1.0 (weekly), Product 0.9 (weekly), rest 0.6 (monthly). |
| I4 | `<html lang="en">` — not India-localised. | ✅ `lang="en-IN"`, `og:locale=en_IN`. |
| I5 | Unused code carried off-pack claims — `HeroSlider.tsx` (“Sinus”, “Nasal”) and `site.positioning` (“Fever”). | ✅ `site.ts` strings aligned to the pack. ⚠️ `HeroSlider.tsx` is dead code — recommend deleting (see §10). |

### 🟢 Recommended enhancements (proposed, not yet built)
- Blog/content hub for informational keywords (§9 content strategy).
- GA4 + ecommerce event tracking (§8) — needs your Measurement ID.
- `sameAs` social links in Organization schema once real handles exist (§7).
- Per-page `BreadcrumbList` on inner pages (currently on `/product` only).

### Checked and already healthy
- ✅ Every inner page has exactly one `<h1>` via the shared `PageHeader`; `<h2>/<h3>` hierarchy is clean.
- ✅ All `next/image` usages have descriptive `alt` text; images are WebP; the hero and the first product image use `priority` (not lazy-loaded), below-the-fold images lazy-load by default.
- ✅ HTTPS, clean descriptive URLs, normal HTML `<Link>` navigation (crawlable), no JS-only content gates.
- ✅ Sitemap already excluded cart/checkout.

---

## 2. Technical fixes implemented (files)

- `src/lib/seo.ts` — **new.** `pageMetadata()` helper (title, description, canonical, OG, Twitter) + JSON-LD builders (`organizationSchema`, `websiteSchema`, `productSchema`, `breadcrumbSchema`, `faqSchema`).
- `src/components/seo/JsonLd.tsx` — **new.** Renders JSON-LD `<script>` blocks.
- `src/app/layout.tsx` — Organization + WebSite JSON-LD site-wide; default `og:image`; `robots` directives (`max-image-preview:large`); `lang="en-IN"`.
- `src/app/page.tsx` — home metadata + screen-reader `<h1>`.
- `src/app/product/page.tsx` — richer title/description + Product, Offer×2, BreadcrumbList, FAQPage JSON-LD.
- Ten content/policy pages — migrated to `pageMetadata()` (canonical + OG each).
- `src/app/robots.ts` — disallow transactional/private paths; `host`.
- `src/app/sitemap.ts` — weighted priorities + change frequency.
- `src/app/cart/layout.tsx`, `src/app/checkout/layout.tsx` — **new.** `noindex`.
- `src/lib/site.ts` — off-pack claim strings aligned to the pack.

**Verified in a production build (`next build` + `next start`):**
- `GET /product` → canonical `https://kadhaplus.com/product`; `og:image https://kadhaplus.com/images/kadhaplus/pack-box-open.webp`; JSON-LD: Product, Brand, Offer×2, BreadcrumbList, FAQPage, Organization, WebSite.
- `GET /` → screen-reader `<h1>`, canonical `https://kadhaplus.com`, Organization + WebSite.
- `GET /cart` → `<meta name="robots" content="noindex, follow">`.
- Build: all 20 routes prerendered static; lint clean; cart/checkout/product pages build and function unchanged.

---

## 3. Page-wise on-page SEO

| Page | Title (`… | KadhaPlus`) | Canonical | Notes |
|------|------------------------|-----------|-------|
| `/` | KadhaPlus — Instant Herbal Kadha \| 17-Herb Kadha Sachets *(absolute)* | `/` | New H1; brand + product keywords. |
| `/product` | Instant Herbal Kadha — Single Sachet ₹20 & 5-Pack ₹100 | `/product` | Product/Offer/Breadcrumb/FAQ schema; price in title. |
| `/ingredients` | Ingredients — The 17 Herbs in KadhaPlus Kadha | `/ingredients` | Lists the real 17 herbs. |
| `/how-to-prepare` | How to Prepare Instant Herbal Kadha | `/how-to-prepare` | Steps match the pack. |
| `/about` | About Us | `/about` | Brand story. |
| `/faqs` | FAQs | `/faqs` | Consider moving FAQ schema here too (see §7). |
| `/contact` | Contact Us | `/contact` | |
| Policies ×5 | unchanged titles | each | Canonical + OG added. |

All titles and descriptions are unique (no duplication).

---

## 4. Keyword mapping (India)

> **No search volumes or difficulty are shown — these must be validated in Google Keyword Planner / Ahrefs / Semrush (see §8).** Mapping is by search intent and relevance.

| Target keyword | Intent | Primary page | Supporting keywords | Content note |
|----------------|--------|--------------|---------------------|--------------|
| KadhaPlus | Brand / navigational | `/` | KadhaPlus kadha, KadhaPlus sachet | Home H1 + Organization schema established. |
| Instant herbal kadha | Commercial | `/product` | instant kadha mix, instant kadha sachet | In title, H1-equivalent, Product schema. |
| Herbal kadha / herbal kadha drink | Commercial/info | `/product`, `/` | ayurvedic herbal kadha, herbal kadha mix | |
| Kadha sachet / kadha sachets online | Transactional | `/product` | 4g kadha sachet, kadha sachet price | Price (₹20/₹100) in title + Offer schema. |
| Ayurvedic herbal kadha | Commercial | `/product`, `/ingredients` | ayurvedic kadha mix | |
| Traditional Indian kadha | Informational | `/about`, *(blog)* | ghar ka kadha, dadi maa ka kadha | Blog candidate (§9). |
| 17 herbs kadha / kadha ingredients | Informational | `/ingredients` | tulsi mulethi kadha, kadha herbs list | Real 17-herb list on page. |
| How to make / prepare kadha | Informational (question) | `/how-to-prepare`, *(blog)* | kadha banane ka tarika, instant kadha kaise banaye | HowTo content; blog candidate. |
| Convenient kadha sachets / ready kadha | Commercial | `/product` | instant kadha for travel/office | |
| Kadha for cough and cold / immunity | Informational | *(blog)*, `/product` | winter kadha, immunity kadha | Keep wellness-worded; no medical claims (§11). |

**Long-tail / question candidates for content:** “what is kadha”, “is kadha good daily”, “kadha vs green tea”, “best instant kadha in India”, “kadha sachet price in India”, “how to store kadha mix”. Validate demand before writing.

---

## 5. Structured data implemented

| Schema | Location | Notes |
|--------|----------|-------|
| **Organization** | all pages (layout) | name, url, logo, description, ContactPoint (email + phone, `areaServed: IN`). **No `address`** and **no `sameAs`** yet — see §7/§10. |
| **WebSite** | all pages (layout) | name, url, `inLanguage en-IN`. No SearchAction (site has no search — not faked). |
| **Product + Offer×2** | `/product` | Real name, 4 images, brand, two Offers (₹20 / ₹100), `priceCurrency INR`, `InStock`, `NewCondition`. **No Review/AggregateRating** (no genuine reviews). |
| **BreadcrumbList** | `/product` | Home › Our Product. |
| **FAQPage** | `/product` | 5 Q&A, matching the visible FAQ. |

**Validation:** paste each URL into the [Rich Results Test](https://search.google.com/test/rich-results) and [Schema Markup Validator](https://validator.schema.org/) after deploy. JSON is minified and valid; expected eligible types: Product snippet, Breadcrumb, FAQ, Merchant listing (via Offer).

---

## 6. Image SEO status
- WebP across product/lifestyle imagery; descriptive `alt` on all `next/image`.
- LCP: hero banner (`priority`, not lazy) and first product image (`priority`). Below-the-fold images lazy-load by default (Next.js).
- `next/image` sets intrinsic `width`/`height` / `fill` with `sizes` → CLS protected.
- Remaining nice-to-have: rename a couple of legacy files to more descriptive names (low impact; `alt` already covers relevance).

## 7. robots.txt & sitemap — status
- `robots.txt`: allow `/`; **disallow `/cart`, `/checkout`, `/api/`**; `sitemap` + `host` set. (Live after deploy at `/robots.txt`.)
- `sitemap.xml`: 12 canonical indexable URLs only; priorities Home 1.0 / Product 0.9 / rest 0.6. (Live at `/sitemap.xml`.)

---

## 8. Google Search Console / Analytics / Merchant Center — **manual action items**
These need your accounts; I did not fake any verification.
1. **GSC:** add property `https://kadhaplus.com`, verify (DNS TXT is most robust). Then **submit `https://kadhaplus.com/sitemap.xml`**.
2. **www vs non-www:** pick one canonical host. Code canonicals use **non-www** (`https://kadhaplus.com`). Ensure your host **301-redirects `www` → non-www** (or change `site.url` if you prefer www) so they don’t compete.
3. **URL inspection / request indexing** for the priority URLs in §12.
4. **GA4:** create a property, then tell me the Measurement ID (`G-XXXXXXX`) and I’ll add GA4 + ecommerce events (`view_item`, `add_to_cart`, `begin_checkout`, `purchase`) wired to the existing cart/checkout. *(Not added yet — needs the ID and your consent-banner preference.)*
5. **Merchant Center (optional):** the Product/Offer schema is feed-compatible; for a full feed you’ll need GTIN/MPN or a “no GTIN” exemption, plus shipping/returns config.

## 9. Content strategy (proposed — not published)
Publish only genuinely useful, original articles (no mass-generated thin pages). Suggested first set, each → internal links to `/product` & `/ingredients`, with `Article` schema:
1. What is traditional Indian kadha?
2. The 17 herbs in KadhaPlus, explained.
3. How to prepare herbal kadha (HowTo).
4. Instant kadha sachets vs homemade kadha.
5. How to store herbal drink mixes.

Say the word and I’ll scaffold a `/blog` route + the first article (asking you to approve any wellness wording).

## 10. Brand / local SEO (NAP) — **needs your confirmation**
- **Name/URL/email/phone** are consistent across the site and schema.
- **Address** (Indiranagar, Bengaluru) is shown on `/contact` but is **deliberately omitted from Organization schema** until you confirm it’s the correct, public **registered business address**. Confirm and I’ll add `PostalAddress` (or LocalBusiness) schema.
- **Social links** are placeholders (`#`) in `site.ts` → omitted from `sameAs`. Give me the real Instagram/Facebook/YouTube/X URLs and I’ll add them (footer + schema).

## 11. Health-claims & product-accuracy audit (Phase 11)
- Visible claims match the pack: **Supports Throat & Respiratory Health, Helps Relieve Cough & Cold, Builds Natural Immunity, 100% Herbal, No Added Preservatives, Ayurvedic Product.** 17 herbs listed exactly as on the back panel.
- **Fixed:** off-pack words (“Fever”, “Sinus”, “Nasal”) removed from `site.ts`.
- ⚠️ **Flagged, needs your call:** `src/components/HeroSlider.tsx` is **unused dead code** that still contains “Seasonal & Sinus Wellness / Throat & Nasal”. Recommend **deleting the file**; it isn’t rendered, but shouldn’t ship. (Left untouched pending your OK.)
- **Not asserted as site text (correct):** FSSAI licence no., batch no., barcode, manufacturer address — these appear only within your own supplied pack image, never as fabricated page copy.

## 12. Indexing submission checklist (after deploy)
Submit these in GSC (URL Inspection → Request Indexing), and confirm the sitemap is processed:
- https://kadhaplus.com/
- https://kadhaplus.com/product
- https://kadhaplus.com/ingredients
- https://kadhaplus.com/how-to-prepare
- https://kadhaplus.com/about
- https://kadhaplus.com/faqs
- https://kadhaplus.com/contact
- (policies get picked up via sitemap; no need to force-index)

## 13. Remaining manual tasks (summary)
- [ ] Verify GSC + submit sitemap; enforce www↔non-www 301.
- [ ] Provide GA4 Measurement ID → I wire ecommerce events.
- [ ] Confirm business address → add PostalAddress schema (or keep omitted).
- [ ] Provide real social URLs → add `sameAs` + footer links.
- [ ] Approve deleting dead `HeroSlider.tsx`.
- [ ] Approve a `/blog` content hub if you want the content phase.
- [ ] Validate keyword demand in Keyword Planner before content writing.
- [ ] Run PageSpeed Insights on the live domain for real Core Web Vitals field data (the build is static + image-optimised; field data needs the live site).

---

*No guaranteed rankings are implied. This is sustainable, white-hat, on-page & technical SEO; ranking depends on content, links and competition over time.*
