import { Product, productService } from "@/services/products";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useProducts(currency: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      async function fetchProducts() {
        try {
          const data = await productService.getAll(0, 20, currency);

          if (isMounted) {
            setProducts(data);
          }
        } catch (error) {
          console.log(error);
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      }

      fetchProducts();

      return () => {
        isMounted = false;
      };
    }, [currency])
  );

  return { products, isLoading };
}
