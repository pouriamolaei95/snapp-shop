export function formatPrice(price: number) {
  return price.toLocaleString("fa-IR", {
    style: "currency",
    currency: "IRR",
  });
}