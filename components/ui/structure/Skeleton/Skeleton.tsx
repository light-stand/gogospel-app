import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import classNames from 'classnames';
import { theme } from '../../../tailwind.config';

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
          useNativeDriver: false
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
    outputRange: [
      theme?.colors?.gray[1],
      theme?.colors?.gray[3],
      theme?.colors?.gray[1]
    ]
  });

  return (
    <View
      style={style}
      className={classNames('h-full w-full', 'overflow-hidden')}
    >
      <Animated.View
        className={classNames('w-full h-full')}
        style={{ backgroundColor: interpolatedColor }}
      />
    </View>
  );
};

export default Skeleton;
