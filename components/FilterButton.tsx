import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

export function FilterButton() {
  return (
    <TouchableOpacity style={styles.button}>
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
