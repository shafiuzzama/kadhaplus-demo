// Shipping rule: free over ₹499, otherwise a flat ₹40.
export const FREE_SHIPPING_THRESHOLD = 49900; // paise
export const FLAT_SHIPPING = 4000; // paise

export function shippingFor(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
}

export function makeOrderNumber(): string {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.floor(Math.random() * 1296)
    .toString(36)
    .toUpperCase()
    .padStart(2, "0");
  return `KP-${t}${r}`;
}
