import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { CONTAINER_PADDING } from "@/constants/Container";
import { authService } from "@/services/auth";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, StyleSheet } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      return Alert.alert("Atenção", "Preencha todos os campos.");
    }

    try {
      setIsLoading(true);
      await authService.login({ email, password });

      router.replace("/(tabs)/home-screen");
    } catch (error) {
      Alert.alert("Erro", "E-mail ou senha inválidos.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.branchIcon}>
          <Image
            source={require("@/assets/images/GreenBranch-icon.png")}
          ></Image>
        </View>
        <Input
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button onPress={handleLogin} disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>

        <View style={styles.registerContainer}>
          <Text lightColor={Colors.light.primaryColor} size="small">
            Ainda não tem conta?
          </Text>
          <Link href="/register-screen" style={styles.link}>
            Clique aqui e cadastre-se
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    padding: CONTAINER_PADDING,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingBottom: 150,
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  branchIcon: {
    backgroundColor: "transparent",
    marginLeft: 30,
  },

  link: {
    color: Colors.light.primaryColor,
    fontSize: 12,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
