import React from "react";
import { View, ViewProps } from "react-native";

import { MaterialIconType } from "../../foundation/Icon/Icon";
import Button from "../Button/Button";

export type ButtonBarOption<T extends string> = {
  label: string;
  value: T;
  icon: MaterialIconType;
};

export interface ButtonBarProps<T extends string> extends ViewProps {
  options: ButtonBarOption<T>[];
  selected: string;
  onPress: (value: T) => void;
}

const ButtonBar = <T extends string>({ selected, options, onPress, style }: ButtonBarProps<T>) => {
  return (
    <View className="flex-row justify-around w-full gap-2" style={style}>
      {options.map(({ label, icon, value }: ButtonBarOption<T>) => (
        <Button
          key={value}
          className="text-xs flex-1 py-1 px-1"
          label={label}
          size="small"
          icon={icon}
          variant={selected === value ? "primary" : "text"}
          onPress={() => onPress(value)}
          block={false}
        />
      ))}
    </View>
  );
};

export default ButtonBar;
