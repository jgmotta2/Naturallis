import { Button } from "@/components/Button";
import { CartItemRenderer } from "@/components/shopping-cart-components/CartItemRenderer";
import { cartItemsMock } from "@/components/shopping-cart-components/ShoppingCartMock";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { CONTAINER_PADDING } from "@/constants/Container";
import { formatCurrency } from "@/helpers/FormatCurrency";
import { FlatList, StyleSheet } from "react-native";

export default function ShoppingCartScreen() {
  const subtotal = cartItemsMock.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 0;
  const total = subtotal - discount;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text size="big" isBold>
          Carrinho de compras
        </Text>
      </View>
      <FlatList
        data={cartItemsMock}
        renderItem={({ item }) => <CartItemRenderer item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footerContainer}>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text size="medium">Sub total:</Text>
            <Text size="medium">{formatCurrency(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text size="medium">Desconto:</Text>
            <Text size="medium">{formatCurrency(discount)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text size="big" isBold>
              Total:
            </Text>
            <Text size="big" isBold style={styles.totalText}>
              {formatCurrency(total)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <Button>Finalizar compra</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingTop: 30,
  },

  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  footerContainer: {
    padding: CONTAINER_PADDING,
    paddingTop: 20,
    gap: 20,
  },
  summaryContainer: {
    paddingTop: 15,
    gap: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalText: {
    color: "#41744E",
  },

  button: {
    marginTop: "auto",
    marginBottom: 16,
    padding: CONTAINER_PADDING,
  },
});
