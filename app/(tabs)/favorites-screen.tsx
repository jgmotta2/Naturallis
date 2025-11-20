import { FilterButton } from "@/components/FilterButton";
import { ProductCard } from "@/components/home-components/ProductCard";
import { ProductsMock } from "@/components/home-components/ProductsMock";
import { Input } from "@/components/Input";
import { Text, View } from "@/components/Themed";
import { CONTAINER_PADDING } from "@/constants/Container";
import { FlatList, StyleSheet } from "react-native";

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text size="big" isBold>
          Produtos Favoritos
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: CONTAINER_PADDING,
        }}
      >
        <View style={{ flex: 1 }}>
          <Input iconName="search" placeholder="Busque aqui" />
        </View>
        <View>
          <FilterButton />
        </View>
      </View>
      <View>
        <FlatList
          numColumns={2}
          data={ProductsMock(10)}
          renderItem={({ item }) => (
            <ProductCard
              title={item.title}
              price={item.price}
              category={item.category}
              image={item.image}
              id={item.id}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});
