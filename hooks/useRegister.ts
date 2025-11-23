import { authService } from "@/services/auth";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export function useRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password || !confirmPassword) {
      return Alert.alert("Atenção", "Preencha os campos obrigatórios.");
    }

    if (password !== confirmPassword) {
      return Alert.alert("Erro", "As senhas não coincidem.");
    }

    if (password.length < 5) {
      return Alert.alert("Erro", "A senha deve ter pelo menos 5 caracteres.");
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
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível criar a conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    name,
    setName,
    email,
    setEmail,
    birthDate,
    setBirthDate,
    address,
    setAddress,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    handleRegister,
  };
}
