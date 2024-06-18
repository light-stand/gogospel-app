import React from "react";
import { TextStyle, TouchableOpacity } from "react-native";
import Icon, { MaterialIconType } from "../../foundation/Icon/Icon";

import clsx from "clsx";

export interface ButtonIconProps {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "transparent";
  size?: "medium" | "small";
  disabled?: boolean;
  icon: MaterialIconType;
  onPress?: () => void;
  style?: any[];
  className?: string;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  variant = "transparent",
  size = "small",
  disabled = false,
  icon,
  onPress = () => {},
  style,
}) => {
  const containedStyling = {
    primary: {
      disabled: "bg-rose-950",
      enabled: "bg-rose-500",
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

  const containedPaddingStyling = {
    small: "p-2",
    medium: "p-4",
  }[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      className={clsx(
        containedStyling,
        containedPaddingStyling,
        "rounded-full",
        "flex",
        "justify-center",
        "flex-row",
        "items-center",
        "self-center"
      )}
      style={style}
    >
      <Icon
        name={icon}
        style={style?.find((e) => e.color)}
        className={clsx(
          disabled && "text-white",
          size === "medium" ? "text-3xl" : "text-2xl",
          variant === "warning" && "text-white"
        )}
      />
    </TouchableOpacity>
  );
};

export default ButtonIcon;
