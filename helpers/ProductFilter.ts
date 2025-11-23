import { FilterState } from "@/context/FilterContext";
import { Product } from "@/services/products";

export function filterProducts(
  products: Product[],
  options: FilterState
): Product[] {
  return products.filter((product) => {
    const search = options.search.toLowerCase().trim();
    const matchesSearch =
      search === "" ||
      product.description.toLowerCase().includes(search) ||
      (product.brand && product.brand.toLowerCase().includes(search)) ||
      (product.model && product.model.toLowerCase().includes(search));

    let matchesCategory = true;

    const categoryField = (product.model || "").toLowerCase();
    const desc = product.description.toLowerCase();

    if (options.categoryId) {
      switch (options.categoryId) {
        case "1":
          matchesCategory =
            categoryField.includes("alimento") ||
            desc.includes("castanha") ||
            desc.includes("mel");
          break;
        case "2":
          matchesCategory =
            categoryField.includes("bem-estar") ||
            categoryField.includes("bem estar") ||
            desc.includes("chá") ||
            desc.includes("erva");
          break;
        case "3":
          matchesCategory =
            categoryField.includes("chá") ||
            categoryField.includes("infus") ||
            desc.includes("chá") ||
            desc.includes("erva");
          break;
        default:
          matchesCategory = true;
      }
    }

    let matchesBrand = true;
    if (options.brand) {
      matchesBrand =
        product.brand?.toLowerCase() === options.brand.toLowerCase();
    }

    let matchesPrice = true;
    if (options.priceRange) {
      const price =
        product.convertedPrice && product.convertedPrice > 0
          ? product.convertedPrice
          : product.price;

      if (options.priceRange === "0-50") matchesPrice = price <= 50;
      if (options.priceRange === "50-100")
        matchesPrice = price > 50 && price <= 100;
      if (options.priceRange === "100+") matchesPrice = price > 100;
    }

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });
}

export function getCategoryLabel(categoryId: string | null): string {
  if (categoryId === "1") return "Alimentos";
  if (categoryId === "2") return "Bem-estar";
  if (categoryId === "3") return "Chás e Infusões";
  return "Geral";
}
