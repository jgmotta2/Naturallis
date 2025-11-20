import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { StyleSheet, Switch } from "react-native";

type Props = {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
};

export function FilterToggle({ label, value, onValueChange }: Props) {
  return (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleText}>{label}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#c7fdccff" }}
        thumbColor={value ? Colors.light.primaryColor : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  toggleContainer: {
    height: 55,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#c7fdccff",
    backgroundColor: "transparent",
  },
  toggleText: {
    color: "#41744E",
    fontSize: 16,
  },
});
