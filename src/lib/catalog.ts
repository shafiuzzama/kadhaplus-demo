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

export const PRODUCT_NAME = "KadhaPlus Classic Kadha";
export const PRODUCT_SLUG = "classic-kadha";

export const VARIANTS: CatalogVariant[] = [
  {
    id: "classic-1",
    sku: "KP-CLASSIC-1",
    name: "Single Sachet",
    price: 2000,
    mrp: 2500,
    stock: 500,
    sachets: 1,
    isDefault: false,
  },
  {
    id: "classic-5",
    sku: "KP-CLASSIC-5",
    name: "Pack of 5 Sachets",
    price: 8900,
    mrp: 12500,
    stock: 300,
    sachets: 5,
    isDefault: true,
  },
];

export function variantById(id: string): CatalogVariant | undefined {
  return VARIANTS.find((v) => v.id === id);
}
