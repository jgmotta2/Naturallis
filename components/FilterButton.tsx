import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

export function FilterButton() {
  return (
    <TouchableOpacity
      onPress={() => router.push("/filters-screen")}
      style={styles.button}
    >
      <Ionicons name="filter-outline" size={24} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#c7fdccff",
    padding: 10,
    height: 55,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
  },
});
