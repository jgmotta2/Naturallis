import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text, View } from "@/components/Themed";
import { CONTAINER_PADDING } from "@/constants/Container";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function ForgotPasswordScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.informations}>
        <Text size="large">Redefinir senha</Text>
        <Text
          size="medium"
          style={{ textAlign: "center", paddingLeft: 50, paddingRight: 50 }}
        >
          Informe o e-mail para o qual deseja redefinir sua senha
        </Text>
      </View>
      <View style={styles.buttons}>
        <Input placeholder="E-mail"></Input>
        <Button>Enviar</Button>
        <TouchableOpacity>
          <Text
            style={{ textAlign: "center", textDecorationLine: "underline" }}
          >
            Reenviar o código
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: CONTAINER_PADDING,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },

  informations: {
    alignItems: "center",
    gap: 10,
  },

  buttons: {
    gap: 20,
    marginBottom: 100,
    width: '100%'
  },
});
