import React from "react";
import { View } from "react-native";
import clsx from "clsx";
import colors from "tailwindcss/colors";
import Tag from "../Tag/Tag";
import Text from "../../foundation/Text/Text";
import { MaterialIconType } from "../../foundation/Icon/Icon";
import { Control, useController } from "react-hook-form";

type Option = {
  label: string;
  value: string;
  icon?: MaterialIconType;
  color?: keyof typeof colors;
};

export interface TagCloudProps {
  options: Option[];
  allSelected?: boolean;
  selection?: string[];
  onSelect?: (value: string) => void;
  label?: string;
  compact?: boolean;
  name?: string;
  control?: Control<any, any>;
  className?: string;
  style?: object[];
}

const TagCloud: React.FC<TagCloudProps> = ({
  options,
  allSelected,
  selection,
  onSelect,
  label,
  name = "",
  control,
  compact,
  style,
}) => {
  const { field } = control ? useController({ control, defaultValue: [], name }) : { field: null };

  const values = selection || (control ? field?.value : []);

  const onPressHandler = (value: string) => {
    if (onSelect) {
      onSelect(value);
    } else if (field) {
      field.onChange(
        field.value.includes(value)
          ? field.value.filter((v: string) => v !== value)
          : [...field.value, value]
      );
    }
  };

  return (
    <View style={style}>
      {label && <Text className="text-gray-4 mb-1 text-sm">{label}</Text>}
      <View className={clsx("flex flex-row flex-wrap")}>
        {options.map((item: Option, index: number) => (
          <Tag
            key={index}
            label={item.label}
            onPress={() => onPressHandler(item.value)}
            selected={allSelected || (values && values.includes(item.value))}
            compact={compact}
            icon={item.icon}
            color={item.color}
            className={clsx(compact ? "m-[1px]" : "m-1")}
          />
        ))}
      </View>
    </View>
  );
};

export default TagCloud;
