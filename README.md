# KadhaPlus — Herbal Wellness Store

A premium, single-product e-commerce website for **KadhaPlus Classic Kadha**
(instant herbal kadha granules), built with Next.js 14 (App Router),
TypeScript, Tailwind CSS, Prisma + SQLite, and a full commerce backend.

## Features

**Storefront**
- Premium marketing pages (Home, About, Ingredients, How to Prepare, FAQs, Contact + policies)
- Product page (PDP) with pack selector, quantity, **Add to Cart** and **Buy Now**
- Slide-in cart drawer + full cart page with quantity management

**Commerce backend (Prisma + SQLite)**
- Customer **registration & login** (JWT httpOnly cookie sessions, bcrypt hashing)
- Server-side **cart** (guest + logged-in, merged on sign-in)
- **Checkout** with shipping address & delivery details
- **Payments** — Razorpay integration via env keys, with a built-in **test/mock
  payment** fallback so the flow works end-to-end without live keys
- **Orders**: confirmation page + customer **order history**
- **Admin dashboard** (`/admin`, admin-only): orders + status management,
  customers, and product price/MRP/stock editing

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Create your env file
cp .env.example .env     # defaults work out of the box for local dev

# 3. Create the database and seed it
npm run db:reset

# 4. Run the dev server
npm run dev              # http://localhost:3000
```

### Demo accounts (created by the seed)
- **Admin:** `admin@kadhaplus.com` / `admin123` → visit `/admin`
- **Customer:** `customer@example.com` / `test1234`

### Payments
Leave the Razorpay keys blank in `.env` to use the built-in **test payment**
(orders are marked paid without a real gateway). To accept real payments, add:

```
RAZORPAY_KEY_ID="rzp_test_xxx"
RAZORPAY_KEY_SECRET="xxx"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_xxx"
```

## Scripts
- `npm run dev` — start the dev server
- `npm run build` — production build (runs `prisma generate` first)
- `npm run db:push` — sync the schema to the database
- `npm run db:seed` — seed product, variants and demo users
- `npm run db:reset` — reset the database and re-seed

## Notes
- Money is stored in **paise** (₹1 = 100) to avoid floating-point errors.
- `dev.db` and `.env` are git-ignored; each environment creates its own.
- Product/regulatory details (ingredients, licences, batch/expiry) remain
  clearly-marked placeholders until the manufacturer confirms them.
