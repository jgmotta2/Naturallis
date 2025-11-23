import { Button } from "@/components/Button";
import { CartItemRenderer } from "@/components/shopping-cart-components/CartItemRenderer";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { CONTAINER_PADDING } from "@/constants/Container";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency } from "@/helpers/FormatCurrency";
import { orderService } from "@/services/order";
import { useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";

export default function ShoppingCartScreen() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { currency } = useCurrency();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCheckout() {
    if (cartItems.length === 0) return;

    try {
      setIsSubmitting(true);

      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      await orderService.createOrder(orderPayload);

      Alert.alert("Sucesso", "Compra realizada com sucesso!", [
        { text: "OK", onPress: () => clearCart() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível finalizar a compra.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text size="big" isBold>
          Carrinho de compras
        </Text>
      </View>

      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <CartItemRenderer item={item} currency={currency} />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.footerContainer}>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text size="big" isBold>
                  Total:
                </Text>
                <Text size="big" isBold style={styles.totalText}>
                  {formatCurrency(cartTotal, currency)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.button}>
            <Button onPress={handleCheckout} disabled={isSubmitting}>
              {isSubmitting ? "Processando..." : "Finalizar compra"}
            </Button>
          </View>
        </>
      ) : (
        <View style={styles.emptyState}>
          <Text style={{ color: "#718096" }}>Seu carrinho está vazio.</Text>
        </View>
      )}
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

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
