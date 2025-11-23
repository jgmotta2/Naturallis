import { Text, View } from "@/components/Themed";
import { CONTAINER_PADDING } from "@/constants/Container";
import { authService } from "@/services/auth";
import { Feather } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

type MenuItem = {
  id: string;
  title: string;
  icon: keyof typeof Feather.glyphMap;
};

const menuItems: MenuItem[] = [
  { id: "1", title: "Meus dados", icon: "user" },
  { id: "2", title: "Segurança", icon: "lock" },
  { id: "3", title: "Meus planos", icon: "file-text" },
  { id: "4", title: "Cadastrar produto", icon: "plus" },
  { id: "5", title: "Envie um feedback", icon: "thumbs-up" },
  { id: "6", title: "Informações do aplicativo", icon: "info" },
  { id: "7", title: "Perguntas frequentes", icon: "help-circle" },
  { id: "8", title: "Sair", icon: "log-out" },
];

export default function UserScreen() {
  const [userName, setUserName] = useState("");

  useFocusEffect(
    useCallback(() => {
      async function loadUserData() {
        try {
          const name = await authService.getUserName();
          setUserName(name || "Usuário");
        } catch (error) {
          console.log("Erro ao carregar dados do usuário", error);
        }
      }
      loadUserData();
    }, [])
  );

  async function handleItemPress(item: MenuItem) {
    if (item.id === "8") {
      await authService.logout();
      router.replace("/");
      return;
    }

    if (item.id === "4") {
      router.push("/register-product-screen");
      return;
    }
  }
  const renderItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => handleItemPress(item)}
    >
      <Feather name={item.icon} size={24} color="#333" />
      <Text style={styles.menuText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageAndName}>
        <Image source={require("@/assets/images/user-image.png")}></Image>

        <Text isBold>{userName}</Text>
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
    paddingTop: 50,
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
