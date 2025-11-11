import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { View } from "@/components/Themed";
import { CONTAINER_PADDING } from "@/constants/Container";
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
      <View style={styles.button}>
        <Button>Entrar</Button>
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
  },

  button: {
    width: '100%',
    marginTop: 51
  }
});
