import * as React from "react";
import { View } from "react-native";
import { Slider as RNSlider } from "@miblanchard/react-native-slider";

import Text from "../../foundation/Text/Text";
import { gray, indigo } from "tailwindcss/colors";
import { Control, useController } from "react-hook-form";

export interface SliderProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number | number[];
  disabled?: boolean;
  valuesMap?: number[];
  labelFormat?: (x: number | number[]) => string;
  setIsScrollBlocked?: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: (
    x: number | number[]
  ) => void | React.Dispatch<React.SetStateAction<number | number[]>>;
  onChangeCompleted?: (x: number | number[]) => void;
  name?: string;
  control?: Control<any, any>;
  compact?: boolean;
  className?: string;
  style?: object[];
}

const Slider = ({
  label,
  min = 0,
  max = 1,
  step,
  value: valueProp,
  disabled = false,
  valuesMap,
  labelFormat,
  setIsScrollBlocked = () => {},
  onChange = () => {},
  onChangeCompleted = () => {},
  name,
  control,
  compact,
  style,
}: SliderProps) => {
  const rangeThumbDistance = 2;

  const colors = {
    primary: disabled ? gray[400] : indigo[500],
    gray: gray[300],
  };

  const { field, fieldState } = useController({
    control,
    defaultValue: "",
    name: name || "",
  });

  const [value, setValue] = React.useState<number | number[]>(field.value);

  const valueWithThumbDistance = !value
    ? [0]
    : typeof value === "number"
    ? [value]
    : [(value as number[])[0], +(value as number[])[1] + rangeThumbDistance];

  const handleChange = (v: number[]): void => {
    let newValue: number | number[] = v;
    if (v.length === 1 || !v[1]) {
      newValue = v[0];
      if (valuesMap) {
        newValue = valuesMap[v[0]];
      }
    } else {
      const previosValue = value as number[];
      const secondValueMin = previosValue[0] + 1;

      let secondValue = (v as number[])[1] - rangeThumbDistance;
      if (secondValue < secondValueMin) {
        secondValue = secondValueMin;
      }
      let firstValue = (v as number[])[0];
      if (firstValue > secondValue - 1) {
        firstValue = secondValue - 1;
      }
      newValue = [firstValue, secondValue];
    }
    onChange(newValue);
    setValue(newValue);
  };

  const handleSlideComplete = () => {
    setIsScrollBlocked(false);
    field.onChange(value);
    onChangeCompleted(value);
  };

  return (
    <View style={style}>
      {label && (
        <View className="flex-row justify-between mb-1">
          <Text className="text-xs text-gray-500 font-medium">{label}</Text>
          <Text className="text-xs text-gray-500 font-medium">
            {labelFormat ? labelFormat(value) : value}
          </Text>
        </View>
      )}
      {/* renderSlider() */}
      <RNSlider
        animateTransitions
        maximumTrackTintColor={colors.gray}
        minimumValue={min}
        maximumValue={max + (typeof value === "number" ? 0 : rangeThumbDistance)}
        step={step}
        thumbTintColor={colors.primary}
        minimumTrackTintColor={colors.primary}
        onSlidingStart={() => setIsScrollBlocked(true)}
        onSlidingComplete={handleSlideComplete}
        onValueChange={handleChange}
        disabled={disabled}
        value={valuesMap ? valuesMap.indexOf(value as number) : valueWithThumbDistance}
        trackStyle={{ height: 6, borderRadius: 6 }}
        thumbStyle={{
          height: compact ? 18 : 30,
          width: compact ? 18 : 30,
          borderRadius: 9999,
        }}
      />
    </View>
  );
};

export default Slider;
