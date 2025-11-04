import { StyleSheet } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Input placeholder="E-mail" />
      <Input placeholder="Senha" />
      <Button>Entrar</Button>
      <View style={styles.registerContainer}>
        <Text lightColor={Colors.light.primaryColor} size="small">
          Ainda não tem conta?
        </Text>
        <Link href={"/(tabs)"} style={styles.link}>
          Clique aqui e cadastre-se
        </Link>
      </View>
      <View>
        <Link href={"/(tabs)/forgot-password-screen"} style={styles.link}>
          Esqueci minha senha
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  link: {
    color: Colors.light.primaryColor,
    fontSize: 12,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
