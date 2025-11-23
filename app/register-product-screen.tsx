import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text, View } from "@/components/Themed";
import { CONTAINER_PADDING } from "@/constants/Container";
import { productService } from "@/services/products";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet } from "react-native";

export default function RegisterProductScreen() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister() {
    if (!name || !price || !brand) {
      return Alert.alert("Erro", "Preencha pelo menos Nome, Marca e Preço.");
    }

    try {
      setIsLoading(true);

      const formattedPrice = parseFloat(price.replace(",", "."));

      await productService.create({
        description: name,
        brand: brand,
        model: category || "Geral",
        currency: "BRL",
        price: isNaN(formattedPrice) ? 0 : formattedPrice,
        imageUrl: imageUrl,
      });

      Alert.alert("Sucesso", "Produto cadastrado com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 403) {
        Alert.alert(
          "Permissão negada",
          "Apenas administradores podem cadastrar produtos."
        );
      } else {
        Alert.alert("Erro", "Falha ao cadastrar produto.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.previewContainer}>
          <View style={styles.imagePlaceholder}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.previewImage} />
            ) : (
              <Ionicons name="camera-outline" size={80} color="#CBD5E0" />
            )}
          </View>

          <View style={styles.previewInfo}>
            <Text isBold size="medium" style={{ marginBottom: 4 }}>
              {name || "Nome do produto"}
            </Text>
            <Text isBold size="medium">
              {price ? `R$ ${price}` : "R$ 00,00"}
            </Text>
            <Text size="small" style={{ color: "#718096", marginTop: 4 }}>
              Estoque: 10 un.
            </Text>
          </View>
        </View>

        <Text style={styles.helperText}>
          Preencha os dados do novo produto:
        </Text>

        <View style={styles.formContainer}>
          <Input
            placeholder="Nome do Produto"
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder="Link da Imagem (URL)"
            value={imageUrl}
            onChangeText={setImageUrl}
            autoCapitalize="none"
          />
          <Input
            placeholder="Preço (ex: 25.90)"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <Input placeholder="Marca" value={brand} onChangeText={setBrand} />
          <Input
            placeholder="Categoria/Modelo"
            value={category}
            onChangeText={setCategory}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button onPress={handleRegister} disabled={isLoading}>
            {isLoading ? "Cadastrando..." : "Finalizar cadastro"}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: CONTAINER_PADDING,
    paddingTop: 30,
  },

  previewContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 25,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  imagePlaceholder: {
    width: 200,
    height: 150,
    backgroundColor: "#E2E8F0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  previewInfo: {
    flex: 1,
    justifyContent: "center",
  },

  helperText: {
    fontSize: 14,
    color: "#4A5568",
    marginBottom: 15,
    fontWeight: "600",
  },

  formContainer: {
    gap: 16,
    marginBottom: 20,
  },

  buttonContainer: {
    marginTop: 10,
    marginBottom: 40,
  },
});
