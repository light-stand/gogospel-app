import React from "react";
import { View } from "react-native";
import { Circle } from "react-native-progress";
import Text from "../../foundation/Text/Text";
import { rose } from "tailwindcss/colors";

export interface SpinnerProps {
  label?: string;
  size?: number;
  color?: string;
  thickness?: number;
  showBackground?: boolean;
  className?: string;
  style?: object[];
}

const Spinner = ({
  label,
  style,
  size = 64,
  color = rose[500],
  thickness = 5,
  showBackground = true,
}: SpinnerProps) => {
  return (
    <>
      {showBackground && (
        <View
          style={style}
          className="absolute w-full h-full z-10 bg-black opacity-50 top-0 left-0"
        />
      )}
      <View
        style={style}
        className="absolute justify-center items-center w-full h-full z-20 top-0 left-0"
      >
        {label && (
          <View className="w-36 h-36 bg-gray-2-60 justify-center items-center  rounded-2xl">
            <Circle
              indeterminate
              size={size}
              color={color}
              borderWidth={thickness}
            />
            {label && <Text className="mt-4 text-center">{label}</Text>}
          </View>
        )}
        {!label && (
          <Circle
            indeterminate
            size={size}
            color={color}
            borderWidth={thickness}
          />
        )}
      </View>
    </>
  );
};

export default Spinner;
