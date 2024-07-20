import React from "react";
import { View } from "react-native";
import clsx from "clsx";
import colors from "tailwindcss/colors";
import Tag from "../Tag/Tag";
import Text from "../../foundation/Text/Text";
import { MaterialIconType } from "../../foundation/Icon/Icon";

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
  onSelect?: (value: string, index: number) => void;
  label?: string;
  compact?: boolean;
  className?: string;
  style?: object[];
}

const TagCloud: React.FC<TagCloudProps> = ({
  options,
  allSelected,
  selection,
  onSelect,
  label,
  style,
  compact,
}) => {
  return (
    <View style={style}>
      {label && <Text className="text-gray-4 mb-1 text-sm">{label}</Text>}
      <View className={clsx("flex flex-row flex-wrap")}>
        {options.map((item: Option, index: number) => (
          <Tag
            key={index}
            label={item.label}
            onPress={onSelect ? () => onSelect(item.value, index) : undefined}
            selected={allSelected || (selection && selection.includes(item.value))}
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
