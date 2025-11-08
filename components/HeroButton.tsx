import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./Themed";

type Props = {
  href?: string;
  onPress?: any;
};

export function HeroButton(props: Props) {
  function onPress() {
    if (props.href) {
      router.push(props.href as any);
      return;
    }
    props?.onPress?.();
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text lightColor="white" size="small">
        Compre agora
      </Text>
      <Ionicons name="chevron-forward-outline" size={18} color={"white"} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#41744E",
    paddingHorizontal: 20,
    borderRadius: 50,
    width: 201,
    height: 32,
  },
});
