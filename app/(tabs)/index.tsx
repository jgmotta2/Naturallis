import { Button } from "@/components/Button";
import { Text } from "@/components/Themed";
import { CONTAINER_PADDING } from "@/constants/Container";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require("@/assets/images/Login-background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/Branch-icon.png")}
          style={styles.icon}
        />
        <Image source={require("@/assets/images/Naturallis-logo.png")} />

        <Text lightColor="white" size="large" isBold style={{ marginTop: 26 }}>
          Reconecte-se.
        </Text>
        <Text lightColor="white" size="large" isBold>
          É natural.
        </Text>
        <View style={styles.buttons}>
          <Button href="/(tabs)/login-screen">Fazer login</Button>
          <Button href="/(tabs)/register-screen" isSecondary>
            Criar conta
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    alignItems: "center",
    marginLeft: 30,
  },

  buttons: {
    marginTop: 70,
    flexDirection: "column",
    gap: 10,
    paddingVertical: 30,
    width: "100%",
    padding: CONTAINER_PADDING,
  },
});
