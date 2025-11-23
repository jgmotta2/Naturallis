import { Product } from "@/services/products";

export function filterProducts(
  products: Product[],
  categoryId: string | null,
  searchText: string
): Product[] {
  return products.filter((product) => {
    let matchesCategory = true;
    const desc = product.description.toLowerCase();

    if (categoryId === "1") {
      matchesCategory = desc.includes("castanha") || desc.includes("mel");
    } else if (categoryId === "2") {
      matchesCategory =
        desc.includes("chá") || desc.includes("erva") || desc.includes("mel");
    }

    const search = searchText.toLowerCase().trim();
    const matchesSearch =
      search === "" ||
      product.description.toLowerCase().includes(search) ||
      (product.brand && product.brand.toLowerCase().includes(search)) ||
      (product.model && product.model.toLowerCase().includes(search));

    return matchesCategory && matchesSearch;
  });
}

export function getCategoryLabel(categoryId: string | null): string {
  if (categoryId === "2") return "Bem-estar";
  if (categoryId === "1") return "Alimentos";
  return "Geral";
}
