import React from "react";
import { TouchableHighlight, TouchableOpacity, View } from "react-native";
import Icon, { MaterialIconType } from "../../foundation/Icon/Icon";
import Text from "../../foundation/Text/Text";
import clsx from "clsx";
import { Control, useController } from "react-hook-form";

export type Option = {
  title: string;
  value: string;
  description?: string;
  icon?: MaterialIconType;
};

export interface SelectProps {
  options: Option[];
  value?: string;
  name: string;
  onSelect?: (value: string, index: number) => void;
  control: Control<any, any>;
  className?: string;
  style?: object[];
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  name,
  control,
  onSelect,
  style,
}) => {
  const { field, fieldState, formState } = useController({
    control,
    defaultValue: "",
    name,
  });
  return (
    <View style={style}>
      {options.map((item: Option, index: number) => {
        const selected = field.value === item.value;
        return (
          <TouchableOpacity
            key={index}
            onPress={() =>
              onSelect
                ? onSelect(item.value, index)
                : field.onChange(item.value)
            }
            disabled={selected}
            className={clsx(
              "rounded-lg",
              "my-2",
              "p-6",
              "border  border-gray-400",
              "bg-gray-1",
              selected && "bg-indigo-200 border-indigo-500 shadow",
              "flex-col items-center justify-between"
            )}
          >
            {item.icon && (
              <Icon
                name={item.icon}
                className={clsx(
                  "my-2 text-gray-600",
                  selected && "text-indigo-500"
                )}
              />
            )}
            <Text
              bold={selected}
              className={clsx(
                "font-semibold text-lg text-gray-600",
                selected && "text-indigo-500"
              )}
            >
              {item.title}
            </Text>
            {item.description && (
              <Text bold={selected} className=" text-gray-500 text-center">
                {item.description}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Select;
