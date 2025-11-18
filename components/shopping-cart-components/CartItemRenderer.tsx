import { CartItem } from "@/components/shopping-cart-components/ShoppingCartMock";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { CONTAINER_PADDING } from "@/constants/Container";
import { formatCurrency } from "@/helpers/FormatCurrency";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export function CartItemRenderer({ item }: { item: CartItem }) {
  const primaryColor = Colors.light.primaryColor;

  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text size="small" style={styles.itemCategory}>
          {item.category}
        </Text>
        <Text size="medium" isBold>
          {item.title}
        </Text>
        <Text size="big" isBold style={styles.itemPrice}>
          {formatCurrency(item.price)}
        </Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity>
          <Ionicons name="remove-circle-outline" size={24} color={primaryColor} />
        </TouchableOpacity>
        <Text>{item.quantity}</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={24} color={primaryColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: CONTAINER_PADDING,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F7FAFC",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: 'contain'
  },
  itemDetails: {
    flex: 1,
    gap: 4,
  },
  itemCategory: {
    color: "#718096",
    textTransform: "uppercase",
    fontSize: 10,
  },
  itemPrice: {
    color: "#41744E",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});