import { Button } from "@/components/Button";
import { Text, View } from "@/components/Themed";
import { CONTAINER_PADDING } from "@/constants/Container";
import { useFavorites } from "@/context/FavoritesContext";
import { formatCurrency } from "@/helpers/FormatCurrency";
import { Product, productService } from "@/services/products";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function ProductDetailsScreen() {
  const params = useLocalSearchParams<{ id: string; currency: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hook dos favoritos
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id, params.currency]);

  async function fetchProduct() {
    try {
      setIsLoading(true);
      const data = await productService.getById(
        Number(params.id),
        params.currency || "BRL"
      );
      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#41744E" />
      </View>
    );
  }

  if (!product) return null;

  const displayPrice =
    product.convertedPrice && product.convertedPrice > 0
      ? product.convertedPrice
      : product.price;

  const displayCurrency = params.currency || product.currency || "BRL";

  const isFav = isFavorite(product.id);

  return (
    <View style={styles.container}>
      <Text isBold size="big">
        {product.description}
      </Text>

      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: product.imageUrl || "https://placehold.co/300.png" }}
        />

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(product)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isFav ? "heart" : "heart-outline"}
            size={24}
            color={isFav ? "#41744E" : "#41744E"} // Pode mudar para vermelho se preferir
          />
        </TouchableOpacity>
      </View>

      <Text>{product.category || "Geral"}</Text>

      <Text isBold>{formatCurrency(displayPrice, displayCurrency)}</Text>

      <Text
        size="small"
        style={{ color: (product.stock || 0) > 0 ? "#41744E" : "red" }}
      >
        {(product.stock || 0) > 0
          ? `Estoque disponível: ${product.stock} unidades`
          : "Produto esgotado"}
      </Text>

      <Text>
        Descubra a essência da tradição com este produto natural. Produzido com
        ingredientes selecionados para garantir o melhor sabor e benefícios para
        sua saúde.
      </Text>

      <View style={styles.buttons}>
        <Button disabled={(product.stock || 0) === 0}>Comprar agora</Button>
        <Button variant="secondary" disabled={(product.stock || 0) === 0}>
          Adicionar ao carrinho
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: CONTAINER_PADDING,
    gap: 12,
  },

  imageContainer: {
    position: "relative",
    alignItems: "center",
  },

  image: {
    width: 370,
    height: 302,
  },

  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  buttons: {
    marginTop: 50,
    gap: 10,
  },
});
