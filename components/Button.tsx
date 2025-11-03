import { router } from "expo-router";
import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./Themed";

type Props = {
  href?: string;
  children: ReactNode;
  onPress?: any;
  isSecondary?: boolean;
};

export function Button(props: Props) {
  function onPress() {
    if (props.href) {
      router.push(props.href as any);
      return;
    }
    props?.onPress?.();
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={props.isSecondary ? styles.secondaryButton : styles.button}
    >
      <Text
        lightColor={props.isSecondary ? "#41744E" : "white"}
        size="medium"
        isBold
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#41744E",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 45,
    width: 370,
  },

  secondaryButton: {
    backgroundColor: "#ffffff",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 45,
    width: 370,
    borderColor: "#41744E",
    borderWidth: 2,
  },
});
