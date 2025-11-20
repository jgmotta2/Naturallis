import { formatCurrency } from "@/helpers/FormatCurrency";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  price: number;
  image: string;
  title: string;
  category: string;
  id: string;
};

export function ProductCard(props: Props) {
  function handleGoToDetailsScreen() {
    router.push(`/product-details-screen?id=${props.id}`);
  }

  return (
    <TouchableOpacity onPress={handleGoToDetailsScreen}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: props.image,
          }}
        />
        <Text style={styles.category}>{props.category}</Text>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>{formatCurrency(props.price)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 12,
    padding: 16,
    gap: 12,
  },
  image: {
    width: 140,
    height: 140,
    backgroundColor: "#F7FAFC",
  },
  category: {
    fontSize: 12,
    color: "#718096",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    color: "#2D3748",
    fontWeight: "600",
    lineHeight: 22,
    paddingHorizontal: 4,
  },
  price: {
    fontSize: 18,
    color: "#71bf60",
    fontWeight: "700",
  },
});
