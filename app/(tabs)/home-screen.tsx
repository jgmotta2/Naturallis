import { CategorySection } from "@/components/home-components/CategorySection";
import { Header } from "@/components/home-components/Header";
import { HeroSection } from "@/components/home-components/HeroSection";
import { View } from "@/components/Themed";
import { StyleSheet } from "react-native";

export default function () {
  return (
    <View style={styles.container}>
      <Header />
      <HeroSection />
      <CategorySection/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  nutsImage: {
    width: "100%",
    resizeMode: "contain",
  },

  button: {
    position: "absolute",
    bottom: 50,
  },
});
