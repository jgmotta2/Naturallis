import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "./Themed";

type Props = { children?: ReactNode };

export function RouteHeader(props: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <FontAwesome
          name="chevron-left"
          size={24}
          color={Colors.light.primaryColor}
        />
      </TouchableOpacity>

      <Text size="big" isBold style={styles.title}>
        {props.children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 24,
    bottom: 15,
    zIndex: 10,
  },
  title: {
    textAlign: "center",
    maxWidth: "70%",
  },
});
