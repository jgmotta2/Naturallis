import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { CONTAINER_PADDING } from "@/constants/Container";
import { Link } from "expo-router";
import { Image, StyleSheet } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.branchIcon}>
        <Image source={require("@/assets/images/GreenBranch-icon.png")}></Image>
      </View>
      <Input placeholder="E-mail" />
      <Input placeholder="Senha" />
      <Button href="/(tabs)/home-screen">Entrar</Button>
      <View style={styles.registerContainer}>
        <Text lightColor={Colors.light.primaryColor} size="small">
          Ainda não tem conta?
        </Text>
        <Link href={"/(tabs)"} style={styles.link}>
          Clique aqui e cadastre-se
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: CONTAINER_PADDING,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingBottom: 150,
  },

  branchIcon: {
    backgroundColor: "transparent",
    marginLeft: 30,
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
