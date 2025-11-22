import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../Themed";

export type FilterOption = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options?: FilterOption[];
  selectedValue?: string | null;
  onSelect?: (value: string | null) => void;
};

export function FilterAccordion({
  label,
  options = [],
  selectedValue,
  onSelect,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOptionLabel = options.find(
    (opt) => opt.value === selectedValue
  )?.label;

  function handleSelectOption(value: string) {
    if (!onSelect) return;

    if (selectedValue === value) {
      onSelect(null);
    } else {
      onSelect(value);
      setIsOpen(false);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.accordionHeader,
          isOpen ? styles.accordionHeaderOpen : null,
        ]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text
          style={[
            styles.accordionTitle,
            selectedValue && styles.accordionTitleSelected,
          ]}
        >
          {selectedOptionLabel || label}
        </Text>

        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color={Colors.light.primaryColor}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.optionsContainer}>
          {options.map((item) => {
            const isSelected = selectedValue === item.value;
            return (
              <TouchableOpacity
                key={item.value}
                style={styles.optionItem}
                onPress={() => handleSelectOption(item.value)}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    overflow: "hidden",
  },
  accordionHeader: {
    backgroundColor: "#c7fdccff",
    height: 55,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 1,
  },
  accordionHeaderOpen: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  accordionTitle: {
    color: "#41744E",
    fontSize: 16,
    fontWeight: "500",
  },
  accordionTitleSelected: {
    fontWeight: "bold",
  },
  optionsContainer: {
    backgroundColor: "#F0FFF4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: -5,
    paddingTop: 15,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  optionText: {
    fontSize: 14,
    color: "#4A5568",
    flex: 1,
  },
  optionTextSelected: {
    color: "#41744E",
    fontWeight: "bold",
  },
});
