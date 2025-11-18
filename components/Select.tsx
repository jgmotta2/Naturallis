import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

type Props = {
  options: [{ label: string; value: string }];
};

export function Select(props: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <Picker
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
    >
      {props.options.map((option) => (
        <Picker.Item
          key={option.value}
          label={option.label}
          value={option.value}
        />
      ))}
    </Picker>
  );
}
