import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text, View } from "@/components/Themed";
import {
  FilterAccordion,
  FilterOption,
} from "@/components/filter-components/FilterAccordion";
import { FilterToggle } from "@/components/filter-components/FilterToggle";
import Colors from "@/constants/Colors";
import { CONTAINER_PADDING } from "@/constants/Container";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

const CATEGORY_OPTIONS: FilterOption[] = [
  { label: "Alimentos", value: "alimentos" },
  { label: "Bebidas", value: "bebidas" },
  { label: "Suplementos", value: "suplementos" },
  { label: "Cosméticos", value: "cosmeticos" },
];

const BRAND_OPTIONS: FilterOption[] = [
  { label: "Naturallis", value: "naturallis" },
  { label: "Verde Vida", value: "verdevida" },
  { label: "BioOrganic", value: "bioorganic" },
];

const PRICE_OPTIONS: FilterOption[] = [
  { label: "Até R$ 50,00", value: "0-50" },
  { label: "R$ 50,00 a R$ 100,00", value: "50-100" },
  { label: "Acima de R$ 100,00", value: "100+" },
];

export default function FiltersScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const [isInstallmentFree, setIsInstallmentFree] = useState(false);
  const [isFreeShipping, setIsFreeShipping] = useState(false);

  function handleClearFilters() {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSelectedPrice(null);
    setIsInstallmentFree(false);
    setIsFreeShipping(false);
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchRow}>
          <Input iconName="search" placeholder="Busque aqui" />
        </View>

        <TouchableOpacity
          style={styles.clearLinkContainer}
          onPress={handleClearFilters}
        >
          <Text style={styles.clearLinkText}>Limpar filtros</Text>
        </TouchableOpacity>

        <View style={styles.sectionsContainer}>
          <FilterAccordion
            label="Categorias"
            options={CATEGORY_OPTIONS}
            selectedValue={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <FilterAccordion
            label="Marcas"
            options={BRAND_OPTIONS}
            selectedValue={selectedBrand}
            onSelect={setSelectedBrand}
          />
          <FilterAccordion
            label="Preços"
            options={PRICE_OPTIONS}
            selectedValue={selectedPrice}
            onSelect={setSelectedPrice}
          />
          <FilterAccordion label="Ofertas e descontos" />
          <FilterAccordion label="Mais comprados" />
        </View>

        <View style={styles.togglesContainer}>
          <FilterToggle
            label="Parcelamento sem juros"
            value={isInstallmentFree}
            onValueChange={setIsInstallmentFree}
          />
          <FilterToggle
            label="Frete grátis"
            value={isFreeShipping}
            onValueChange={setIsFreeShipping}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button onPress={() => router.back()}>Ver resultados</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  searchRow: {
    paddingHorizontal: CONTAINER_PADDING,
    marginTop: 20,
  },
  clearLinkContainer: {
    alignItems: "flex-end",
    paddingHorizontal: CONTAINER_PADDING,
    marginTop: 10,
    marginBottom: 10,
  },
  clearLinkText: {
    color: Colors.light.primaryColor,
    textDecorationLine: "underline",
    fontSize: 12,
  },
  sectionsContainer: {
    paddingHorizontal: CONTAINER_PADDING,
    gap: 4,
  },
  togglesContainer: {
    paddingHorizontal: CONTAINER_PADDING,
    marginTop: 12,
    gap: 12,
    marginBottom: 40,
  },
  footer: {
    padding: CONTAINER_PADDING,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: Colors.light.background,
  },
});
