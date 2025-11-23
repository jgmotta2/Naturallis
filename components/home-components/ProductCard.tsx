import { formatCurrency } from "@/helpers/FormatCurrency";
import { router } from "expo-router";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const cardMargin = 8;

const cardWidth = screenWidth / 2 - cardMargin * 3;

type Props = {
  price: number;
  image: string;
  title: string;
  category: string;
  id: string;
  currency: string;
};

export function ProductCard(props: Props) {
  function handleGoToDetailsScreen() {
    router.push(
      `/product-details-screen?id=${props.id}&currency=${props.currency}`
    );
  }

  return (
    <TouchableOpacity onPress={handleGoToDetailsScreen}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: props.image }} />
        <Text style={styles.category}>{props.category}</Text>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {props.title}
        </Text>
        <Text style={styles.price}>
          {formatCurrency(props.price, props.currency)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: cardMargin,
    padding: 12,
    gap: 5,
  },
  image: {
    width: "100%",
    height: 120,
    backgroundColor: "transparent",
  },
  category: {
    fontSize: 10,
    color: "#718096",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    color: "#2D3748",
    fontWeight: "600",
  },
  price: {
    fontSize: 16,
    color: "#41744E",
    fontWeight: "700",
  },
});
