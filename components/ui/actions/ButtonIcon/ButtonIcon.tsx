import React from "react";
import { TextStyle, TouchableHighlight } from "react-native";
import Icon, { MaterialIconType } from "../../foundation/Icon/Icon";

import clsx from "clsx";

export interface ButtonIconProps {
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
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
      disabled: "bg-primary-dark-1",
      enabled: "bg-primary",
    },
    secondary: {
      disabled: "bg-gray-1",
      enabled: "bg-gray-1 border border-gray-4",
    },
    tertiary: {
      disabled: "bg-gray-1",
      enabled: "bg-gray-1 opacity-80",
    },
    success: {
      disabled: "bg-success-dark",
      enabled: "bg-success",
    },
    warning: {
      disabled: "bg-warning-dark",
      enabled: "bg-warning",
    },
    danger: {
      disabled: "bg-danger-dark",
      enabled: "bg-danger",
    },
    transparent: {
      disabled: "bg-tranparent",
      enabled: "",
    },
  }[variant][disabled ? "disabled" : "enabled"];

  const underlayColor = {
    primary: "bg-rose-400",
    secondary: "bg-stone-400",
    success: "bg-lime-400",
    warning: "bg-yellow-400",
    danger: "bg-red-400",
    tertiary: "bg-gray-400",
    transparent: "bg-[#00000030]",
  }[variant];

  const containedPaddingStyling = {
    small: "p-2",
    medium: "p-4",
  }[size];

  return (
    <TouchableHighlight
      onPress={onPress}
      disabled={disabled}
      underlayColor={underlayColor}
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
          disabled && "text-background",
          size === "medium" ? "text-h1" : "text-h3",
          variant === "warning" && "text-background"
        )}
      />
    </TouchableHighlight>
  );
};

export default ButtonIcon;
