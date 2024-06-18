import React from "react";
import { TouchableOpacity } from "react-native";
import Text from "../../foundation/Text/Text";
import Icon, { MaterialIconType } from "../../foundation/Icon/Icon";

import clsx from "clsx";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "medium" | "small";
  disabled?: boolean;
  icon?: MaterialIconType | null;
  label: string | null;
  block?: boolean;
  onPress?: () => void;
  style?: object[];
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  icon,
  label,
  block = true,
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
  }[variant][disabled ? "disabled" : "enabled"];

  const containedPaddingStyling = {
    small: {
      label: "px-6 py-2",
      labelIcon: "pl-6 pr-5 py-2",
    },
    medium: {
      label: "px-9 py-3",
      labelIcon: "pl-9 pr-7 py-3",
    },
  }[size][icon && label ? "labelIcon" : "label"];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      className={clsx(
        containedStyling,
        containedPaddingStyling,
        "rounded-lg",
        "flex",
        "justify-center",
        "flex-row",
        "items-center",
        block && label ? "self-stretch" : "self-center"
      )}
      style={style}
    >
      <>
        <Text
          bold
          className={clsx(
            disabled && "text-white text-base",
            variant === "warning" && "text-white"
          )}
        >
          {label}
        </Text>
        {icon && (
          <Icon
            name={icon}
            className={clsx(
              disabled && "text-white",
              "ml-2 text-2xl",
              variant === "warning" && "text-white"
            )}
          />
        )}
      </>
    </TouchableOpacity>
  );
};

export default Button;
