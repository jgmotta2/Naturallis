import { Product } from "@/services/products";

type FilterOptions = {
  search: string;
  categoryId: string | null;
  brand: string | null;
  priceRange: string | null;
};

export function filterProducts(
  products: Product[],
  options: FilterOptions
): Product[] {
  return products.filter((product) => {
    const search = options.search.toLowerCase().trim();
    const matchesSearch =
      search === "" ||
      product.description.toLowerCase().includes(search) ||
      (product.brand && product.brand.toLowerCase().includes(search));

    let matchesCategory = true;
    const desc = product.description.toLowerCase();

    if (options.categoryId === "1") {
      matchesCategory = desc.includes("castanha") || desc.includes("mel");
    } else if (options.categoryId === "2") {
      matchesCategory =
        desc.includes("chá") || desc.includes("erva") || desc.includes("mel");
    }

    let matchesBrand = true;
    if (options.brand) {
      matchesBrand =
        product.brand?.toLowerCase() === options.brand.toLowerCase();
    }

    let matchesPrice = true;
    if (options.priceRange) {
      const price = product.price;
      if (options.priceRange === "0-50") matchesPrice = price <= 50;
      if (options.priceRange === "50-100")
        matchesPrice = price > 50 && price <= 100;
      if (options.priceRange === "100+") matchesPrice = price > 100;
    }

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });
}

export function getCategoryLabel(categoryId: string | null): string {
  if (categoryId === "2") return "Bem-estar";
  if (categoryId === "1") return "Alimentos";
  return "Geral";
}
