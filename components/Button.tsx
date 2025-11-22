import { router } from "expo-router";
import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./Themed";

type Props = {
  href?: string;
  children: ReactNode;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  color?: string;
  disabled?: boolean;
};

export function Button({ variant = "primary", disabled, ...props }: Props) {
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
    if (disabled) return;

    if (props.href) {
      router.push(props.href as any);
      return;
    }
    props?.onPress?.();
  }

  const stylesVariant = getButtonVariant();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={{
        ...styles.button,
        backgroundColor: stylesVariant?.backgroundColor,
        borderColor: stylesVariant?.borderColor,
        borderWidth: stylesVariant?.borderWidth,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Text
        lightColor={stylesVariant?.textColor}
        size="medium"
        isBold={stylesVariant?.isBold}
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
