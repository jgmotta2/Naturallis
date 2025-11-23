import { CategorySection } from "@/components/home-components/CategorySection";
import { Header } from "@/components/home-components/Header";
import { HeroSection } from "@/components/home-components/HeroSection";
import { ProductsSection } from "@/components/home-components/ProductsSection";
import { View } from "@/components/Themed";
import { authService } from "@/services/auth";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const [currency, setCurrency] = useState("BRL");
  const [userName, setUserName] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function loadUserName() {
      const name = await authService.getUserName();
      if (name) {
        setUserName(name);
      }
    }
    loadUserName();
  }, []);

  function toggleCurrency() {
    setCurrency((prev) => (prev === "BRL" ? "USD" : "BRL"));
  }

  return (
    <View style={styles.container}>
      <Header
        currentCurrency={currency}
        onToggleCurrency={toggleCurrency}
        userName={userName}
        searchText={searchText}
        onSearchChange={setSearchText}
      />

      <ScrollView>
        <HeroSection currency={currency} />

        <CategorySection
          selectedCategory={category}
          onSelectCategory={setCategory}
        />

        <ProductsSection
          currency={currency}
          selectedCategory={category}
          searchText={searchText}
        />
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
