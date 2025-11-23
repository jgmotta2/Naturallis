import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  source?: "home" | "favorites";
};

export function FilterButton({ source = "home" }: Props) {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/filters-screen?source=${source}`)}
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
    borderRadius: 50,
  },
});
