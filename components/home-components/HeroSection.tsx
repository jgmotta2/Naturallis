import { Image, StyleSheet } from "react-native";
import { HeroButton } from "../HeroButton";
import { View } from "../Themed";

export function HeroSection() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/nuts.png")}
        style={styles.nutsImage}
      />
      <View style={styles.button}>
        <HeroButton href="/(tabs)/register-screen" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  nutsImage: {
    width: "100%",
    resizeMode: "contain",
  },

  button: {
    position: "absolute",
    backgroundColor: "transparent",
    bottom: 25,
    right: 20,
  },
});
