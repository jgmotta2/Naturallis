import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { View } from "@/components/Themed";
import { StyleSheet } from "react-native";

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Input placeholder="E-mail"></Input>
      <Input placeholder="Nome de usuário"></Input>
      <Input placeholder="Data de nascimento"></Input>
      <Input placeholder="Endereço"></Input>
      <Input placeholder="Senha"></Input>
      <Input placeholder="Confirmação de senha"></Input>
      <View style={{ marginTop: 51 }}>
        <Button>Entrar</Button>
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
});
