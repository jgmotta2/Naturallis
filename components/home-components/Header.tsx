import Colors from "@/constants/Colors";
import { CONTAINER_PADDING } from "@/constants/Container";
import { useState } from "react";
import { StyleSheet, Switch } from "react-native";
import { FilterButton } from "../FilterButton";
import { Input } from "../Input";
import { Text, View } from "../Themed";

export function Header() {
  const [switchState, setSwitchState] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.greetings}>
        <Text>Bem-vindo Pedro!</Text>
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <View style={{ flex: 1 }}>
          <Input iconName="search" placeholder="Busque aqui" />
        </View>

        <View>
          <FilterButton />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: CONTAINER_PADDING,
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
