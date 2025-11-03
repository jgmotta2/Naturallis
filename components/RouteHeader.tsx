import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";

type Props = { children?: ReactNode };

export function RouteHeader(props: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <FontAwesome
          name="chevron-left"
          size={28}
          color={Colors.light.primaryColor}
          style={{ marginBottom: -3 }}
        />
        <Text>{props.children}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingLeft: 24,
    flexDirection: "row",
    gap: 24,
  },
});
