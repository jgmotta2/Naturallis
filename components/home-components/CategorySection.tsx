import { CONTAINER_PADDING } from "@/constants/Container";
import { Link } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../Themed";

const CATEGORIES = [
  { id: "1", name: "Alimentos" },
  { id: "2", name: "Bem-estar" },
  { id: "3", name: "Orgânicos" },
  { id: "4", name: "Sementes" },
  { id: "5", name: "Kits" },
  { id: "6", name: "Plantas" },
];

type ItemProps = {
  title: string;
  onPress: () => void;
  isSelected: boolean;
};

const Item = ({ title, onPress, isSelected }: ItemProps) => {
  const itemStyle = isSelected
    ? [styles.item, styles.itemSelected]
    : styles.item;
  const textStyle = isSelected
    ? [styles.itemText, styles.itemTextSelected]
    : styles.itemText;

  return (
    <TouchableOpacity onPress={onPress} style={itemStyle}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

type Props = {
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
};

export function CategorySection({ selectedCategory, onSelectCategory }: Props) {
  const renderItem = ({ item }: { item: { id: string; name: string } }) => (
    <Item
      title={item.name}
      isSelected={item.id === selectedCategory}
      onPress={() => {
        if (item.id === selectedCategory) {
          onSelectCategory(null);
        } else {
          onSelectCategory(item.id);
        }
      }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text size="big" isBold>
          Categorias
        </Text>
        <Link href="/(tabs)/all-categories-screen" style={{ color: "#41744E" }}>
          Todas as categorias
        </Link>
      </View>

      <FlatList
        data={CATEGORIES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: CONTAINER_PADDING,
  },

  text: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: CONTAINER_PADDING,
    bottom: 10,
  },

  list: {
    marginTop: 16,
    paddingLeft: CONTAINER_PADDING,
  },

  item: {
    borderWidth: 2,
    borderColor: "#41744E",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  itemText: {
    color: "#41744E",
    fontSize: 14,
  },

  itemSelected: {
    backgroundColor: "#41744E",
  },

  itemTextSelected: {
    color: "#FFFFFF",
  },
});
