import { Header } from "@/components/home-components/Header";
import { View } from "@/components/Themed";
import { StyleSheet } from "react-native";

export default function () {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
