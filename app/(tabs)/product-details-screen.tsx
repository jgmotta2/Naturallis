import { Button } from "@/components/Button";
import { ProductsMock } from "@/components/home-components/ProductsMock";
import { Text, View } from "@/components/Themed";
import { CONTAINER_PADDING } from "@/constants/Container";
import { formatCurrency } from "@/helpers/FormatCurrency";
import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet } from "react-native";

export default function ProductDetailsScreen() {
  const params = useLocalSearchParams();
  const product = ProductsMock(10).find((item) => item.id === params.id);

  if (!product) return null;

  return (
    <View style={styles.container}>
      <Text isBold size="big">
        {product?.title}
      </Text>
      <Image style={styles.image} source={{ uri: product?.image }} />
      <Text>{product?.category}</Text>
      <Text isBold>{formatCurrency(product?.price)}</Text>
      <Text size="small">
        {product?.hasStock ? "Estoque disponível" : "Produto não disponível"}
      </Text>
      <Text>{product.desciption}</Text>
      <Button>Comprar agora</Button>
      <Button variant="secondary">Adicionar ao carrinho</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: CONTAINER_PADDING,
    gap: 12,
  },

  image: {
    width: 370,
    height: 302,
  },
});
