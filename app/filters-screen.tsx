import { Button } from "@/components/Button";
import { Text, View } from "@/components/Themed";
import {
  FilterAccordion,
  FilterOption,
} from "@/components/filter-components/FilterAccordion";
import { FilterToggle } from "@/components/filter-components/FilterToggle";
import Colors from "@/constants/Colors";
import { CONTAINER_PADDING } from "@/constants/Container";
import { FilterSource, useFilter } from "@/context/FilterContext";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

const CATEGORY_OPTIONS: FilterOption[] = [
  { label: "Alimentos", value: "1" },
  { label: "Bem-estar", value: "2" },
];

const BRAND_OPTIONS: FilterOption[] = [
  { label: "Naturallis", value: "naturallis" },
  { label: "Verde Vida", value: "verdevida" },
  { label: "BioOrganic", value: "bioorganic" },
  { label: "Apiário", value: "apiário" },
];

const PRICE_OPTIONS: FilterOption[] = [
  { label: "Até R$ 50,00", value: "0-50" },
  { label: "R$ 50,00 a R$ 100,00", value: "50-100" },
  { label: "Acima de R$ 100,00", value: "100+" },
];

export default function FiltersScreen() {
  const params = useLocalSearchParams<{ source: FilterSource }>();
  const source = params.source || "home";

  const { homeFilters, favoritesFilters, updateFilter, resetFilters } =
    useFilter();

  const currentFilters = source === "home" ? homeFilters : favoritesFilters;

  const setCategory = (val: string | null) =>
    updateFilter(source, "categoryId", val);
  const setBrand = (val: string | null) => updateFilter(source, "brand", val);
  const setPriceRange = (val: string | null) =>
    updateFilter(source, "priceRange", val);

  const setFreeShipping = (val: boolean) =>
    updateFilter(source, "onlyFreeShipping", val);
  const setInterestFree = (val: boolean) =>
    updateFilter(source, "onlyInterestFree", val);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.clearLinkContainer}
          onPress={() => resetFilters(source)}
        >
          <Text style={styles.clearLinkText}>Limpar filtros</Text>
        </TouchableOpacity>

        <View style={styles.sectionsContainer}>
          <FilterAccordion
            label="Categorias"
            options={CATEGORY_OPTIONS}
            selectedValue={currentFilters.categoryId}
            onSelect={setCategory}
          />
          <FilterAccordion
            label="Marcas"
            options={BRAND_OPTIONS}
            selectedValue={currentFilters.brand}
            onSelect={setBrand}
          />
          <FilterAccordion
            label="Preços"
            options={PRICE_OPTIONS}
            selectedValue={currentFilters.priceRange}
            onSelect={setPriceRange}
          />
        </View>

        <View style={styles.togglesContainer}>
          <FilterToggle
            label="Parcelamento sem juros"
            value={currentFilters.onlyInterestFree}
            onValueChange={setInterestFree}
          />
          <FilterToggle
            label="Frete grátis"
            value={currentFilters.onlyFreeShipping}
            onValueChange={setFreeShipping}
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
  clearLinkContainer: {
    alignItems: "flex-end",
    paddingHorizontal: CONTAINER_PADDING,
    marginTop: 25,
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
    backgroundColor: Colors.light.background,
    paddingBottom: 50,
  },
});
