import { CONTAINER_PADDING } from "@/constants/Container";
import { Product, productService } from "@/services/products";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Text } from "../Themed";
import { ProductCard } from "./ProductCard";

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#41744E" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text} size="big" isBold>
        Produtos
      </Text>
      <View style={styles.productList}>
        {products.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            title={item.name}
            price={item.price}
            category={item.category || "Geral"}
            image={item.image || "https://placehold.co/150@3x.png"}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: CONTAINER_PADDING,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  productList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
