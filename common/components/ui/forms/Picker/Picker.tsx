import React, { useState } from "react";
import { View } from "react-native";
import clsx from "clsx";
import RNPickerSelect, { Item } from "react-native-picker-select";
import { Control, useController } from "react-hook-form";
import colors from "tailwindcss/colors";

import Text from "../../foundation/Text/Text";
import Icon, { MaterialIconType } from "../../foundation/Icon/Icon";

export type PickerProps = {
  items: Item[];
  label?: string;
  value?: string;
  name: string;
  onChange?: (text: string) => void;
  placeholder?: string | null;
  maxLength?: number;
  disabled?: boolean;
  helperText?: string | null;
  icon?: MaterialIconType;
  onLayout?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isValid?: boolean;
  error?: boolean;
  control: Control<any, any>;
  className?: string;
  style?: object[];
};

const Picker: React.FC<PickerProps> = ({
  items,
  label,
  value,
  name,
  onChange,
  disabled,
  helperText,
  icon,
  onLayout,
  error: globalError,
  control,
  style,
  ...props
}) => {
  const [textPickerHeight, setTextPickerHeight] = useState(0);

  const { field, fieldState, formState } = useController({
    control,
    defaultValue: "",
    name,
  });

  const { error: fieldError, isDirty, invalid, isTouched } = fieldState;
  const error = fieldError?.message || globalError;
  const valid = formState.isSubmitted && isDirty && !invalid && !error;

  return (
    <View style={style}>
      {label && (
        <Text
          className={clsx(
            "text-xs text-gray-500 mb-1 font-medium",
            valid && "text-green-600",
            error && "text-red-500"
          )}
        >
          {label}
        </Text>
      )}
      <View
        className={clsx(
          "bg-gray-1",
          "rounded-lg",
          "border",
          disabled ? "border-gray-200" : "border-gray-400",
          "focus:border-gray-500",
          error && "border-danger",
          "flex-row items-center",
          valid && "border-green-600",
          error && "border-red-500",
          disabled && "bg-gray-200"
        )}
      >
        <RNPickerSelect
          style={{
            inputIOS: {
              height: 40,
              fontSize: 14,
              paddingVertical: 20,
              paddingHorizontal: 16,
              color: disabled ? colors.gray["500"] : "#000",
              flex: 1,
            },
            inputAndroid: {
              height: 40,
              fontSize: 14,
              paddingVertical: 20,
              paddingHorizontal: 16,
              color: disabled ? colors.gray["500"] : "#000",
              flex: 1,
            },
          }}
          disabled={disabled}
          onValueChange={(value) => field.onChange(value)}
          items={items}
          value={field.value}
        />
        {icon && (
          <Icon
            name={icon}
            className={clsx("text-gray-500", "mr-2")}
            style={[{ marginRight: 10 }]}
          />
        )}
      </View>

      {(helperText || fieldError?.message) && (
        <Text className={clsx("mt-1 text-xs", "text-gray-2", error && "text-red-500")}>
          {helperText || fieldError?.message}
        </Text>
      )}
    </View>
  );
};

export default Picker;
