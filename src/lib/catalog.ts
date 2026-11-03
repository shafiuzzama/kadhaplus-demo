/* ============================================================================
   Static product catalog — no database.
   This replaces the Prisma/SQLite data layer for now. When the backend is
   re-integrated, swap these constants for live data fetched from the DB.
   Prices are in paise (₹1 = 100) to stay consistent with money.ts.
   ========================================================================== */

export type CatalogVariant = {
  id: string;
  sku: string;
  name: string;
  price: number; // paise
  mrp: number; // paise
  stock: number;
  sachets: number;
  isDefault: boolean;
};

export const PRODUCT_NAME = "KadhaPlus Instant Herbal Kadha";
export const PRODUCT_SLUG = "instant-herbal-kadha";

// Prices match the printed packaging: ₹20 per 4 g sachet, ₹100 for the 5-sachet
// combo box (MRP ₹100 printed on the box). mrp === price — no fabricated discount.
export const VARIANTS: CatalogVariant[] = [
  {
    id: "classic-1",
    sku: "KP-CLASSIC-1",
    name: "Single Sachet",
    price: 2000,
    mrp: 2000,
    stock: 500,
    sachets: 1,
    isDefault: false,
  },
  {
    id: "classic-5",
    sku: "KP-CLASSIC-5",
    name: "Combo Pack · 5 Sachets",
    price: 10000,
    mrp: 10000,
    stock: 300,
    sachets: 5,
    isDefault: true,
  },
];

export function variantById(id: string): CatalogVariant | undefined {
  return VARIANTS.find((v) => v.id === id);
}
