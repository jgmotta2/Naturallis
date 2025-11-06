import Colors from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet, Switch } from "react-native";
import { Text, View } from "../Themed";

export function Header() {
  const [switchState, setSwitchState] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.greetings}>
        <Text>Bem-vindo Pedro</Text>
        <View style={styles.switch}>
          <Text>{!switchState ? "BRL" : "USD"}</Text>
          <Switch
            trackColor={{ false: "#767577", true: Colors.light.primaryColor }}
            thumbColor={switchState ? Colors.light.primaryColor : "#f4f3f4"}
            value={switchState}
            onValueChange={() =>
              setSwitchState((previousState) => !previousState)
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },

  greetings: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  switch: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
