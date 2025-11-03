import { ComponentProps } from "react";
import { StyleSheet, TextInput } from "react-native";

export function Input(props: ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      placeholderTextColor={"#41744E"}
      style={styles.input}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#c7fdccff",
    width: 370,
    height: 60,
    borderRadius: 45,
    textAlign: "center",
    color: "#41744E",
  },
});
