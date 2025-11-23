export function formatCurrency(price: number, currency: string = "BRL") {
  const locale = currency === "BRL" ? "pt-br" : "en-us";

  return Intl.NumberFormat(locale, {
    currency: currency,
    style: "currency",
  }).format(price);
}
