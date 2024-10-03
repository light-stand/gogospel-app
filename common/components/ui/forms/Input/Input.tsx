import React, { useState } from "react";
import { View, TextInput, InputModeOptions, Platform, TextInputProps } from "react-native";
import { Control, useController } from "react-hook-form";
import clsx from "clsx";

import Text from "../../foundation/Text/Text";
import Icon, { MaterialIconType } from "../../foundation/Icon/Icon";

export type InputProps = Omit<TextInputProps, "onChange"> & {
  type?: "text" | "textarea";
  label?: string;
  value?: string;
  name: string;
  onChange?: (text: string | number) => void;
  placeholder?: string | null;
  maxLength?: number;
  inputMode?: InputModeOptions;
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

const Input: React.FC<InputProps> = ({
  type = "text",
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
  const [textInputHeight, setTextInputHeight] = useState(0);

  const { field, fieldState, formState } = useController({
    control,
    defaultValue: "",
    name,
  });

  const { error: fieldError, isDirty, invalid, isTouched } = fieldState;
  const error = fieldError?.message || globalError;
  const valid = formState.isSubmitted && isDirty && !invalid && !error;

  const onChangeText = (text: string) => {
    const value =
      props.keyboardType === "numeric" && text ? Number(text.replaceAll(/\D/g, "")) : text;
    field.onChange(value);
    onChange && onChange(value);
  };

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
          "rounded-lg",
          "border border-gray-400",
          "focus:border-gray-500 focus:shadow-sm",
          error && "border-danger",
          "flex-row items-center",
          type === "textarea" && "h-28 items-start max-h-32",
          valid && "border-green-600",
          error && "border-red-500"
        )}
      >
        {icon && <Icon name={icon as any} className="absolute left-3" />}
        <TextInput
          className={clsx(
            "font-medium",
            "text-gray-5",
            disabled && "text-gray-2",
            "py-3 px-4",
            icon && "pl-10",
            "w-full",
            type === "textarea" && "h-full",
            valid && "text-green-600",
            error && "text-red-600"
          )}
          onChangeText={onChangeText}
          value={`${field.value}`}
          multiline={type === "textarea"}
          numberOfLines={type === "textarea" ? 4 : undefined}
          // placeholderTextColor={theme?.colors?.gray[3]}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          spellCheck={false}
          editable={!disabled}
          onLayout={(event) => {
            if (textInputHeight === 0) {
              setTextInputHeight(event.nativeEvent.layout.height);
            }
            onLayout && onLayout();
          }}
          onContentSizeChange={(event) => {
            setTextInputHeight(event.nativeEvent.contentSize.height);
          }}
          style={
            //Android textarea height workaround
            Platform.OS === "android" && type === "textarea" && { height: textInputHeight }
          }
          onBlur={field.onBlur}
          {...props}
        />
      </View>

      {(helperText || fieldError?.message) && (
        <Text className={clsx("mt-1 text-xs", "text-gray-2", error && "text-red-500")}>
          {helperText || fieldError?.message}
        </Text>
      )}
    </View>
  );
};

export default Input;
