import React from "react";
import { TextStyle, TouchableOpacity } from "react-native";
import Icon, { MaterialIconType } from "../../foundation/Icon/Icon";

import clsx from "clsx";

export interface IconButtonProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "transparent";
  size?: "medium" | "small";
  disabled?: boolean;
  icon: MaterialIconType;
  onPress?: () => void;
  style?: any[];
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  variant = "transparent",
  size = "small",
  disabled = false,
  icon,
  onPress = () => {},
  style,
}) => {
  const containedStyling = {
    primary: {
      disabled: "bg-neutral-400",
      enabled: "bg-indigo-500",
    },
    secondary: {
      disabled: "bg-stone-950",
      enabled: "bg-stone-500",
    },
    success: {
      disabled: "bg-lime-950",
      enabled: "bg-lime-500",
    },
    warning: {
      disabled: "bg-yellow-950",
      enabled: "bg-yellow-500",
    },
    danger: {
      disabled: "bg-red-950",
      enabled: "bg-red-500",
    },
    transparent: {
      disabled: "bg-tranparent",
      enabled: "",
    },
  }[variant][disabled ? "disabled" : "enabled"];

  const containedPaddingStyling =
    variant === "transparent"
      ? "h-8 w-8"
      : {
          small: "h-12 w-12",
          medium: "h-14 w-14",
        }[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.6}
      className={clsx(
        containedStyling,
        containedPaddingStyling,
        "rounded-full aspect-square",
        "flex justify-center flex-row items-center self-center",
        variant !== "transparent" && variant !== "secondary" && "shadow-lg"
      )}
      style={style}
    >
      <Icon
        name={icon}
        style={style?.find((e) => e.color)}
        className={clsx(
          size === "medium" ? "text-3xl" : "text-2xl",
          variant === "primary" && "text-white"
        )}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
