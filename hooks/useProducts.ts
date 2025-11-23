import { Product, productService } from "@/services/products";
import { useEffect, useState } from "react";

export function useProducts(currency: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        setIsLoading(true);
        const data = await productService.getAll(0, 20, currency);
        if (isMounted) setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [currency]);

  return { products, isLoading };
}
