import { router } from "expo-router";
import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./Themed";

type Props = {
  href?: string;
  children: ReactNode;
  onPress?: any;
  variant?: "primary" | "secondary" | "tertiary";
  color?: string;
};

export function Button({ variant = "primary", ...props }: Props) {
  function getButtonVariant() {
    if (variant === "primary") {
      return {
        backgroundColor: "#41744E",
        textColor: "white",
        isBold: true,
      };
    }
    if (variant === "secondary") {
      return {
        backgroundColor: "#ffffff",
        borderColor: "#41744E",
        borderWidth: 2,
        textColor: "#41744E",
      };
    }
    if (variant === "tertiary") {
      return {
        backgroundColor: "#c7fdccff",
        textColor: "#41744E",
      };
    }
  }

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
      style={{
        ...styles.button,
        backgroundColor: getButtonVariant()?.backgroundColor,
        borderColor: getButtonVariant()?.borderColor,
        borderWidth: getButtonVariant()?.borderWidth,
      }}
    >
      <Text
        lightColor={getButtonVariant()?.textColor}
        size="medium"
        isBold={getButtonVariant()?.isBold}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 45,
    width: "100%",
  },
});
