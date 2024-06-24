import React, { useState } from "react";
import {
  Image as RNImage,
  View,
  ImageSourcePropType,
  ViewStyle,
} from "react-native";
import clsx from "clsx";
import { Skeleton } from "../Skeleton";

export interface ImageProps {
  source: ImageSourcePropType;
  blurRadius?: undefined | number;
  onError?: (error: any) => void;
  className?: string;
  style?: ViewStyle | ViewStyle[];
}

const Image: React.FC<ImageProps> = ({
  source,
  blurRadius = undefined,
  onError,
  style,
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={style} className={clsx("overflow-hidden")}>
      {!loaded && <Skeleton />}
      <RNImage
        source={source}
        onLoadEnd={() => setLoaded(true)}
        className={clsx("w-full h-full")}
        onError={onError}
        blurRadius={blurRadius}
      />
    </View>
  );
};

export default Image;
