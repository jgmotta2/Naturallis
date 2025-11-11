import { Text, View } from "@/components/Themed";
import { CONTAINER_PADDING } from "@/constants/Container";
import { Feather } from "@expo/vector-icons";
import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

const menuItems = [
  { id: "1", title: "Meus dados", icon: "user" },
  { id: "2", title: "Segurança", icon: "lock" },
  { id: "3", title: "Meus planos", icon: "file-text" },
  { id: "4", title: "Cadastrar produto", icon: "plus" },
  { id: "5", title: "Envie um feedback", icon: "thumbs-up" },
  { id: "6", title: "Informações do aplicativo", icon: "info" },
  { id: "7", title: "Perguntas frequentes", icon: "help-circle" },
  { id: "8", title: "Sair", icon: "log-out" },
] as const;

const renderItem = ({ item }: { item: (typeof menuItems)[number] }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Feather name={item.icon} size={24} color="#333" />
    <Text style={styles.menuText}>{item.title}</Text>
  </TouchableOpacity>
);

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imageAndName}>
        <Image source={require("@/assets/images/user-image.png")}></Image>
        <Text isBold>Pedro Pascal</Text>
      </View>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },

  imageAndName: {
    alignItems: "center",
    gap: 26,
    padding: CONTAINER_PADDING,
    marginBottom: 20,
  },

  list: {
    flex: 1,
    paddingHorizontal: CONTAINER_PADDING,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: CONTAINER_PADDING,
    gap: 20,
  },

  menuText: {
    fontSize: 16,
    color: "black",
  },
});
