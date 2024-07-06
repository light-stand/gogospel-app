import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import clsx from "clsx";

export interface SkeletonProps {
  className?: string;
  duration?: number;
  style?: object[];
}

const Skeleton: React.FC<SkeletonProps> = ({ style, duration = 1500 }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration,
          useNativeDriver: false,
        })
      ).start();
    };

    startAnimation();

    return () => {
      animatedValue.stopAnimation();
    };
  }, [animatedValue, duration]);

  const interpolatedColor = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["#c0c0c0", "#a0a0a0", "#c0c0c0"],
  });

  return (
    <View style={style} className={clsx("h-full w-full", "overflow-hidden")}>
      <Animated.View
        className={clsx("w-full h-full")}
        style={{ backgroundColor: interpolatedColor }}
      />
    </View>
  );
};

export default Skeleton;
