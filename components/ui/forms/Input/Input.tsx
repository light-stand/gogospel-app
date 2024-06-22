import React, { useState } from "react";
import {
  View,
  TextInput,
  KeyboardTypeOptions,
  InputModeOptions,
  Platform,
} from "react-native";
import clsx from "clsx";
import Text from "../../foundation/Text/Text";
import Icon, { MaterialIconType } from "../../foundation/Icon/Icon";

export interface InputProps {
  type?: "text" | "textarea";
  label?: string;
  value: string;
  onChange?: (text: string) => void;
  placeholder?: string | null;
  maxLength?: number;
  inputMode?: InputModeOptions;
  keyboardType?: KeyboardTypeOptions;
  disabled?: boolean;
  helperText?: string | null;
  error?: boolean | null;
  icon?: MaterialIconType;
  onLayout?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  style?: object[];
}

const Input: React.FC<InputProps> = ({
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  inputMode,
  keyboardType,
  disabled,
  helperText,
  error,
  icon,
  onLayout,
  onFocus,
  onBlur,
  style,
}) => {
  const [textInputHeight, setTextInputHeight] = useState(0);
  return (
    <View style={style}>
      {label && (
        <Text className="text-xs text-gray-500 mb-1 font-medium">{label}</Text>
      )}
      <View
        className={clsx(
          "bg-gray-1",
          disabled && "bg-background",
          "rounded-lg",
          "border border-gray-400",
          "focus:border-gray-500",
          error && "border-danger",
          "flex-row items-center",
          type === "textarea" && "rounded-3xl h-22 items-start max-h-32"
        )}
      >
        {icon && <Icon name={icon as any} className="absolute left-3" />}
        <TextInput
          className={clsx(
            "font-sans",
            "text-gray-5",
            disabled && "text-gray-2",
            "py-3 px-4",
            icon && "pl-10",
            "w-full",
            type === "textarea" && "h-full"
          )}
          onChangeText={onChange}
          value={value}
          multiline={type === "textarea"}
          numberOfLines={type === "textarea" ? 4 : undefined}
          maxLength={maxLength}
          placeholder={placeholder as string}
          // placeholderTextColor={theme?.colors?.gray[3]}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          spellCheck={false}
          inputMode={inputMode}
          keyboardType={keyboardType}
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
            Platform.OS === "android" &&
            type === "textarea" && { height: textInputHeight }
          }
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </View>

      {helperText && (
        <Text
          className={clsx(
            "mt-1 text-xs",
            "text-gray-2",
            error && "text-danger"
          )}
        >
          {helperText}
        </Text>
      )}
    </View>
  );
};

export default Input;
