import { Text } from "@/components/Themed";
import { Image, ImageBackground, StyleSheet } from "react-native";

export default function LoginScreen() {
  return (
    <ImageBackground
      source={require("@/assets/images/Login-background.png")}
      style={styles.background}
    >
      <ImageBackground style={styles.container} />
      <Image source={require("@/assets/images/ramo.png")} />
      <Image source={require("@/assets/images/logo.png")} />
      <Text lightColor="white" size="large">
        UM DOIS TRES
      </Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
