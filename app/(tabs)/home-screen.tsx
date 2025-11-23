import { CategorySection } from "@/components/home-components/CategorySection";
import { Header } from "@/components/home-components/Header";
import { HeroSection } from "@/components/home-components/HeroSection";
import { ProductsSection } from "@/components/home-components/ProductsSection";
import { View } from "@/components/Themed";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const [currency, setCurrency] = useState("BRL");

  function toggleCurrency() {
    setCurrency((prev) => (prev === "BRL" ? "USD" : "BRL"));
  }

  return (
    <View style={styles.container}>
      <Header currentCurrency={currency} onToggleCurrency={toggleCurrency} />

      <ScrollView>
        <HeroSection />
        <CategorySection />
        <ProductsSection currency={currency} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nutsImage: {
    width: "100%",
    resizeMode: "contain",
  },
  button: {
    position: "absolute",
    bottom: 50,
  },
});
