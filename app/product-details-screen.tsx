import { Button } from "@/components/Button";
import { Text, View } from "@/components/Themed";
import { CONTAINER_PADDING } from "@/constants/Container";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { formatCurrency } from "@/helpers/FormatCurrency";
import { orderService } from "@/services/order";
import { Product, productService } from "@/services/products";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function ProductDetailsScreen() {
  const params = useLocalSearchParams<{ id: string; currency: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuying, setIsBuying] = useState(false);

  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (params.id) fetchProduct();
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

  function handleAddToCart() {
    if (product) {
      addToCart(product);
      Alert.alert("Sucesso", "Produto adicionado ao carrinho!");
    }
  }

  function handleBuyNow() {
    if (!product) return;
    Alert.alert(
      "Finalizar Compra",
      `Deseja confirmar a compra de: ${product.description}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: processDirectOrder },
      ]
    );
  }

  async function processDirectOrder() {
    if (!product) return;
    try {
      setIsBuying(true);
      await orderService.createOrder({
        items: [{ productId: product.id, quantity: 1 }],
      });
      Alert.alert("Sucesso", "Pedido realizado!", [
        { text: "OK", onPress: () => router.replace("/(tabs)/home-screen") },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível processar a compra.");
    } finally {
      setIsBuying(false);
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
  const hasStock = (product.stock || 0) > 0;
  const isFav = isFavorite(product.id);

  return (
    <View style={styles.container}>
      <Text isBold size="big">
        {product.description}
      </Text>

      <View>
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
            color="#41744E"
          />
        </TouchableOpacity>
      </View>

      <Text>{product.category || "Geral"}</Text>

      <Text isBold>{formatCurrency(displayPrice, displayCurrency)}</Text>

      <Text size="small">
        {hasStock
          ? `Estoque disponível: ${product.stock} unidades`
          : "Produto não disponível"}
      </Text>

      <Text>
        Descubra a essência da tradição com este produto natural. Produzido com
        ingredientes selecionados para garantir o melhor sabor e benefícios para
        sua saúde.
      </Text>

      <View style={styles.buttons}>
        <Button onPress={handleBuyNow} disabled={!hasStock || isBuying}>
          {isBuying ? "Processando..." : "Comprar agora"}
        </Button>

        <Button
          variant="secondary"
          onPress={handleAddToCart}
          disabled={!hasStock || isBuying}
        >
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
