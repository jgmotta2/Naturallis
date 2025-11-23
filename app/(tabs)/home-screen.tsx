import { CategorySection } from "@/components/home-components/CategorySection";
import { Header } from "@/components/home-components/Header";
import { HeroSection } from "@/components/home-components/HeroSection";
import { ProductsSection } from "@/components/home-components/ProductsSection";
import { View } from "@/components/Themed";
import { useCurrency } from "@/context/CurrencyContext";
import { useFilter } from "@/context/FilterContext";
import { authService } from "@/services/auth";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const { currency, toggleCurrency } = useCurrency();

  const { homeFilters, updateFilter } = useFilter();

  const [userName, setUserName] = useState("");

  useFocusEffect(
    useCallback(() => {
      async function loadUserName() {
        try {
          const name = await authService.getUserName();
          setUserName(name || "");
        } catch (error) {
          console.log("Erro ao carregar usuário", error);
        }
      }
      loadUserName();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Header
        currentCurrency={currency}
        onToggleCurrency={toggleCurrency}
        userName={userName}
        searchText={homeFilters.search}
        onSearchChange={(text) => updateFilter("home", "search", text)}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <HeroSection currency={currency} />

        <CategorySection
          selectedCategory={homeFilters.categoryId}
          onSelectCategory={(id) => updateFilter("home", "categoryId", id)}
        />

        <ProductsSection currency={currency} filters={homeFilters} />
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
