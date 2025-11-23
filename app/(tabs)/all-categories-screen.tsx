import { Button } from "@/components/Button";
import { FilterButton } from "@/components/FilterButton";
import { Input } from "@/components/Input";
import { Text, View } from "@/components/Themed";
import { CONTAINER_PADDING } from "@/constants/Container";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

const ALL_CATEGORIES = [
  "Alimentos naturais",
  "Chás e infusões",
  "Produtos Agrícolas",
  "Suplementos Naturais",
  "Alimentos funcionais e sem glúten",
  "Bem-estar e estilo de vida",
  "Temperos e condimentos Naturais",
  "Grãos, sementes e oleaginosas",
  "Bebidas naturais e funcionais",
];

export default function AllCategoriesScreen() {
  const [searchText, setSearchText] = useState("");

  const filteredCategories = ALL_CATEGORIES.filter((category) =>
    category.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.textHeader}>
        <Text size="big" isBold>
          Todas as categorias
        </Text>
      </View>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Input
            iconName="search"
            placeholder="Busque aqui"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <View>
          <FilterButton />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.buttons}>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <Button key={index} variant="tertiary" href="/(tabs)/home-screen">
                {category}
              </Button>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={{ color: "#718096" }}>
                Nenhuma categoria encontrada.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textHeader: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: CONTAINER_PADDING,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  buttons: {
    gap: 10,
    padding: CONTAINER_PADDING,
  },

  emptyState: {
    alignItems: "center",
    marginTop: 20,
  },
});
