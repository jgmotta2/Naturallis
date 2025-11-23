import { FilterButton } from "@/components/FilterButton";
import { ProductCard } from "@/components/home-components/ProductCard";
import { Input } from "@/components/Input";
import { Text, View } from "@/components/Themed";
import { CONTAINER_PADDING } from "@/constants/Container";
import { useCurrency } from "@/context/CurrencyContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useFilter } from "@/context/FilterContext";
import { filterProducts } from "@/helpers/ProductFilter";
import { Product, productService } from "@/services/products";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const { currency } = useCurrency();

  const { favoritesFilters, updateFilter } = useFilter();

  const [displayFavorites, setDisplayFavorites] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    updateFavoritesData();
  }, [favorites, currency]);

  async function updateFavoritesData() {
    if (favorites.length === 0) {
      setDisplayFavorites([]);
      return;
    }

    setIsLoading(true);
    try {
      const promises = favorites.map((fav) =>
        productService.getById(fav.id, currency)
      );

      const updatedProducts = await Promise.all(promises);
      setDisplayFavorites(updatedProducts);
    } catch (error) {
      console.error("Erro ao atualizar favoritos:", error);
      setDisplayFavorites(favorites);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredFavorites = filterProducts(displayFavorites, favoritesFilters);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text size="big" isBold>
          Produtos Favoritos
        </Text>
      </View>

      <View style={styles.searchRow}>
        <View style={{ flex: 1 }}>
          <Input
            iconName="search"
            placeholder="Busque aqui"
            value={favoritesFilters.search}
            onChangeText={(text) => updateFilter("favorites", "search", text)}
          />
        </View>
        <View>
          <FilterButton source="favorites" />
        </View>
      </View>

      <View style={styles.listContainer}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#41744E"
            style={{ marginTop: 50 }}
          />
        ) : filteredFavorites.length > 0 ? (
          <FlatList
            numColumns={2}
            data={filteredFavorites}
            renderItem={({ item }) => (
              <ProductCard
                id={item.id.toString()}
                title={item.description}
                price={
                  item.convertedPrice && item.convertedPrice > 0
                    ? item.convertedPrice
                    : item.price
                }
                category={item.category || "Geral"}
                image={item.imageUrl || "https://placehold.co/150.png"}
                currency={currency}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.columnWrapper}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={{ color: "#718096" }}>
              {favoritesFilters.search
                ? "Nenhum favorito encontrado com esse filtro."
                : "Você ainda não tem produtos favoritos."}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: CONTAINER_PADDING,
    width: "100%",
  },

  listContainer: {
    flex: 1,
    width: "100%",
  },

  columnWrapper: {
    justifyContent: "flex-start",
    gap: 10,
  },

  emptyState: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
