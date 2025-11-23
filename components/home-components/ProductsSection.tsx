import { CONTAINER_PADDING } from "@/constants/Container";
import { FilterState } from "@/context/FilterContext";
import { filterProducts, getCategoryLabel } from "@/helpers/ProductFilter";
import { useProducts } from "@/hooks/useProducts";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text } from "../Themed";
import { ProductCard } from "./ProductCard";

type Props = {
  currency: string;
  filters: FilterState;
};

export function ProductsSection({ currency, filters }: Props) {
  const { products, isLoading } = useProducts(currency);

  const filteredProducts = filterProducts(products, filters);

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
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id.toString()}
                  title={item.description}
                  price={
                    item.convertedPrice && item.convertedPrice > 0
                      ? item.convertedPrice
                      : item.price
                  }
                  category={getCategoryLabel(filters.categoryId)}
                  image={item.imageUrl || "https://placehold.co/150.png"}
                  currency={currency}
                />
              ))
            ) : (
              <Text style={{ padding: 20 }}>Nenhum produto encontrado.</Text>
            )}
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
