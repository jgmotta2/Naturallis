import { CONTAINER_PADDING } from "@/constants/Container";
import { SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "../Themed";
import { ProductCard } from "./ProductCard";
import { ProductsMock } from "./ProductsMock";

export function ProductsSection() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.text} size="big" isBold>
            Produtos
          </Text>
          <View style={styles.productList}>
            {ProductsMock(10).map((item) => (
              <ProductCard
                key={item.id}
                title={item.title}
                price={item.price}
                category={item.category}
                image={item.image}
                id={item.id}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: CONTAINER_PADDING,
    bottom: 10,
  },

  container: {
    flex: 1,
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7FAFC",
  },
  productList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
