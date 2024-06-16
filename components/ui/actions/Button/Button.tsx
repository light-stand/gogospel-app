import React from "react";
import { TouchableHighlight } from "react-native";
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
  block = false,
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

  const lightColorHex = {
    primary: "",
    secondary: "",
    success: "",
    warning: "",
    danger: "",
  }[variant];

  return (
    <TouchableHighlight
      onPress={onPress}
      disabled={disabled}
      underlayColor={lightColorHex}
      className={clsx(
        containedStyling,
        containedPaddingStyling,
        "rounded-full",
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
          size="h5"
          bold
          className={clsx(
            disabled && "text-background",
            variant === "warning" && "text-background"
          )}
        >
          {label}
        </Text>
        {icon && (
          <Icon
            name={icon}
            className={clsx(
              disabled && "text-background",
              "ml-2 text-h3",
              variant === "warning" && "text-background"
            )}
          />
        )}
      </>
    </TouchableHighlight>
  );
};

export default Button;
