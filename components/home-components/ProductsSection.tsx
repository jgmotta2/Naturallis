import { CONTAINER_PADDING } from "@/constants/Container";
import { Product, productService } from "@/services/products";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
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
      console.log(error);
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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.text} size="big" isBold>
            Produtos
          </Text>
          <View style={styles.productList}>
            {products.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id.toString()}
                title={item.description}
                price={
                  item.convertedPrice && item.convertedPrice > 0
                    ? item.convertedPrice
                    : item.price
                }
                category={"Geral"}
                image={item.imageUrl || "https://placehold.co/150.png"}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  text: { paddingHorizontal: CONTAINER_PADDING, bottom: 10 },
  container: { flex: 1, paddingVertical: 10 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  productList: { flex: 1, flexDirection: "row", flexWrap: "wrap" },
});
