import { Button } from "@/components/Button";
import { FilterButton } from "@/components/FilterButton";
import { Input } from "@/components/Input";
import { View } from "@/components/Themed";
import { CONTAINER_PADDING } from "@/constants/Container";
import { StyleSheet } from "react-native";

export default function () {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Input iconName="search" placeholder="Busque aqui" />
        </View>
        <View>
          <FilterButton />
        </View>
      </View>
      <View style={styles.buttons}>
        <Button variant="tertiary" href="/(tabs)/home-screen">
          Alimentos naturais
        </Button>
        <Button variant="tertiary" href="/(tabs)/home-screen">
          Chás e infusões
        </Button>
        <Button variant="tertiary" href="/(tabs)/home-screen">
          Produtos Agrícolas
        </Button>
        <Button variant="tertiary" href="/(tabs)/home-screen">
          Suplementos Naturais
        </Button>
        <Button variant="tertiary" href="/(tabs)/home-screen">
          Alimentos funcionais e sem glúten
        </Button>
        <Button variant="tertiary" href="/(tabs)/home-screen">
          Bem-estar e estilo de vida
        </Button>
        <Button variant="tertiary" href="/(tabs)/home-screen">
          Temperos e condimentos Naturais
        </Button>
        <Button variant="tertiary" href="/(tabs)/home-screen">
          Grãos, sementes e oleaginosas
        </Button>
        <Button variant="tertiary" href="/(tabs)/home-screen">
          Bebidas naturais e funcionais
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: CONTAINER_PADDING,
  },

  buttons: {
    gap: 10,
    padding: CONTAINER_PADDING,
  },
});
