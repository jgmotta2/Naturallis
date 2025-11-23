import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { CONTAINER_PADDING } from "@/constants/Container";
import { authService } from "@/services/auth";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password || !confirmPassword) {
      return Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
    }

    if (password !== confirmPassword) {
      return Alert.alert("Erro", "As senhas não coincidem.");
    }

    try {
      setIsLoading(true);

      await authService.register({
        name,
        email,
        password,
      });

      Alert.alert("Sucesso", "Conta criada com sucesso!", [
        { text: "OK", onPress: () => router.replace("/login-screen") },
      ]);
    } catch (error: any) {
      console.log("--- INÍCIO DO ERRO ---");
      console.log("Erro completo:", error);
      if (error.response) {
        console.log("Dados da resposta:", error.response.data);
        console.log("Status:", error.response.status);
        console.log("Headers:", error.response.headers);
      } else if (error.request) {
        console.log("Requisição feita mas sem resposta:", error.request);
      } else {
        console.log("Erro na configuração:", error.message);
      }
      console.log("--- FIM DO LOG ---");

      Alert.alert(
        "Erro",
        "Não foi possível criar a conta. Verifique o console (terminal) para detalhes."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.branchIcon}>
          <Image source={require("@/assets/images/GreenBranch-icon.png")} />
        </View>

        <Input
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          placeholder="Nome de usuário"
          value={name}
          onChangeText={setName}
        />
        <Input
          placeholder="Data de nascimento"
          value={birthDate}
          onChangeText={setBirthDate}
        />
        <Input
          placeholder="Endereço"
          value={address}
          onChangeText={setAddress}
        />
        <Input
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Input
          placeholder="Confirmação de senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <View style={styles.button}>
          <Button onPress={handleRegister} disabled={isLoading}>
            {isLoading ? "Cadastrando..." : "Entrar"}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: "center",
  },
  container: {
    padding: CONTAINER_PADDING,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingBottom: 100,
    backgroundColor: "white",
  },

  button: {
    width: "100%",
    marginTop: 50,
  },

  branchIcon: {
    backgroundColor: "transparent",
    marginLeft: 30,
  },
});
