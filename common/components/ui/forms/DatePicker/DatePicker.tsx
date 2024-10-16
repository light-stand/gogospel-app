import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import clsx from "clsx";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Control, useController } from "react-hook-form";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { Text } from "../../foundation";
import { Modal } from "../../structure";
import { Button } from "../../actions";

interface DatePickerProps {
  name: string;
  date?: Date;
  onChange?: (newDate: Date) => void;
  label?: string;
  inline?: boolean;
  helperText?: string | null;
  control: Control<any, any>;
  disabled?: boolean;
  className?: string;
  error?: boolean | null;
  style?: object[];
}

const DatePicker = ({
  date: propDate,
  onChange,
  label,
  inline,
  error: globalError,
  helperText,
  disabled,
  control,
  name,
  style,
}: DatePickerProps) => {
  const { t } = useTranslation();
  const { field, fieldState } = useController({
    control,
    name,
    defaultValue: propDate || new Date(),
  });
  //only for IOS
  const [modalOpen, setModalOpen] = useState(false);

  const isIOS = Platform.OS === "ios";

  const [date, setDate] = useState(propDate || field.value);
  const dateString = dayjs(date).format("DD/MM/YYYY");

  const { error: fieldError } = fieldState;
  const error = fieldError?.message;

  const onDateChange = (_: any, selectedDate: Date | undefined) => {
    setDate(selectedDate as Date);
    field.onChange(selectedDate as Date);
  };

  const openAndroidPicker = () =>
    DateTimePickerAndroid.open({
      // locale: 'pt-BR',
      value: new Date(date),
      onChange: onDateChange,
      display: "spinner",
    });

  const openIOSPicker = () => setModalOpen(true);

  useEffect(() => {
    if (field.value) setDate(field.value);
  }, [field.value]);

  let content;

  if (inline) {
    content = (
      <View>
        {isIOS && (
          <DateTimePicker
            locale="pt-BR"
            value={new Date(date)}
            mode="date"
            disabled={disabled}
            display="spinner"
            onChange={onDateChange}
            textColor="white"
          />
        )}
        {!isIOS && (
          <Button block variant="secondary" onPress={openAndroidPicker} label={dateString} />
        )}
      </View>
    );
  } else {
    content = (
      <View style={style}>
        {label && <Text className={clsx("text-xs text-gray-500 mb-1 font-medium")}>{label}</Text>}
        <TouchableOpacity
          className={clsx(
            "bg-gray-1",
            "rounded-lg",
            "border",
            disabled ? "border-gray-200" : "border-gray-400",
            "focus:border-gray-500",
            error && "border-danger",
            "flex-row items-center",
            error && "border-red-500",
            disabled && "bg-gray-200"
          )}
          disabled={disabled}
          onPress={isIOS ? openIOSPicker : openAndroidPicker}
        >
          <Text
            className={clsx(
              "font-sans text-gray-5 py-3 px-4 w-full",
              error && "text-red-500",
              disabled && "text-gray-500"
            )}
          >
            {dateString}
          </Text>
        </TouchableOpacity>
        {isIOS && (
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            // title={t("profiling.birthday.title")}
          >
            <View className={clsx("rounded-lg bg-white", "p-4")}>
              <DateTimePicker
                // locale="pt-BR"
                disabled={disabled}
                value={new Date(date)}
                mode="date"
                display="spinner"
                onChange={onDateChange}
              />
              <Button
                variant="secondary"
                onPress={() => setModalOpen(false)}
                label={t("action.done")}
                className="mt-4"
                size="small"
                disabled={disabled}
              />
            </View>
          </Modal>
        )}
        {(helperText || error) && (
          <Text className={clsx("mt-1 text-xs", "text-gray-2", error && "text-red-500")}>
            {helperText || error}
          </Text>
        )}
      </View>
    );
  }

  return content;
};

export default DatePicker;
