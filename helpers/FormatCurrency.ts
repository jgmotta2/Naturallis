export function formatCurrency(price: number) {
  return Intl.NumberFormat("pt-br", {
    currency: "BRL",
    style: "currency",
  }).format(price);
}
