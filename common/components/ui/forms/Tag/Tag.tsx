import React from "react";
import { TouchableOpacity } from "react-native";
import clsx from "clsx";
import colors from "tailwindcss/colors";
import Text from "../../foundation/Text/Text";
import Icon, { MaterialIconType } from "../../foundation/Icon/Icon";

export interface TagProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  compact?: boolean;
  icon?: MaterialIconType;
  color?: keyof typeof colors;
  className?: string;
  style?: object[];
}

const Tag: React.FC<TagProps> = ({ label, selected, onPress, compact, color, icon, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress && onPress}
      disabled={!onPress}
      className={clsx(
        selected && !color ? "border-neutral-400 bg-neutral-200" : "border-neutral-500",
        "flex flex-row rounded-lg items-center",
        "self-start",
        compact ? "px-2 py-[2px]" : "py-1 px-2"
      )}
      style={[
        style,
        color && {
          backgroundColor: colors[selected ? color : "neutral"][selected ? 200 : 200],
          borderColor: colors[selected ? color : "neutral"][selected ? 400 : 600],
        },
      ]}
    >
      {icon && (
        <Icon
          name={icon}
          className={clsx(
            "mr-1",
            selected ? "text-neutral-700" : "text-neutral-400",
            compact ? "text-xs" : "text-sm"
          )}
          style={[
            {
              ...(color && {
                color: colors[selected ? color : "neutral"][selected ? 600 : 500],
              }),
            },
          ]}
        />
      )}
      <Text
        className={clsx(
          selected ? "text-neutral-700" : "text-neutral-400",
          compact ? "text-xs" : "text-md"
        )}
        style={{
          ...(color && {
            color: colors[selected ? color : "neutral"][selected ? 600 : 500],
          }),
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Tag;
