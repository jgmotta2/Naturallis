import Colors from "@/constants/Colors";
import { CONTAINER_PADDING } from "@/constants/Container";
import { StyleSheet, Switch } from "react-native";
import { FilterButton } from "../FilterButton";
import { Input } from "../Input";
import { Text, View } from "../Themed";

type Props = {
  currentCurrency: string;
  onToggleCurrency: () => void;
  userName: string;
  searchText: string;
  onSearchChange: (text: string) => void;
};

export function Header({
  currentCurrency,
  onToggleCurrency,
  userName,
  searchText,
  onSearchChange,
}: Props) {
  const isUSD = currentCurrency === "USD";

  return (
    <View style={styles.container}>
      <View style={styles.greetings}>
        <Text>Bem-vindo {userName || "Visitante"}!</Text>
        <View style={styles.switch}>
          <Text>{currentCurrency}</Text>
          <Switch
            trackColor={{ false: "#767577", true: Colors.light.primaryColor }}
            thumbColor={isUSD ? Colors.light.primaryColor : "#f4f3f4"}
            value={isUSD}
            onValueChange={onToggleCurrency}
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
          <Input
            iconName="search"
            placeholder="Busque aqui"
            value={searchText}
            onChangeText={onSearchChange}
          />
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
