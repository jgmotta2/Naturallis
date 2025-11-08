import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { DimensionValue, StyleSheet, TextInput } from "react-native";
import { View } from "./Themed";

type Props = {
  width?: DimensionValue;
  iconName?: string;
} & ComponentProps<typeof TextInput>;

export function Input(props: Props) {
  return (
    <View
      style={{
        ...styles.inputContainer,
        width: props.width || "100%",
      }}
    >
      {!!props.iconName && (
        <Ionicons
          color={"#41744E"}
          name="search"
          style={styles.inputIcon}
          size={20}
        />
      )}
      <TextInput
        placeholderTextColor={"#41744E"}
        style={{
          ...styles.input,
          width: props.width || "100%",
        }}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#c7fdccff",
    height: 60,
    borderRadius: 45,
    paddingLeft: 60,
    color: "#41744E",
  },

  inputContainer: {
    position: "relative",
    width: "100%",
  },

  inputIcon: {
    position: "absolute",
    left: 20,
    top: 20,
    zIndex: 1,
  },
});
