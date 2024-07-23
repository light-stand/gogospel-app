import React, { useState } from "react";
import {
  Image as RNImage,
  View,
  ImageSourcePropType,
  ViewStyle,
  ImageProps as RNImageProps,
} from "react-native";
import clsx from "clsx";
import { Skeleton } from "../Skeleton";

export interface ImageProps extends RNImageProps {}

const Image: React.FC<ImageProps> = ({ style, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={style} className={clsx("overflow-hidden")}>
      {!loaded && <Skeleton />}
      <RNImage onLoadEnd={() => setLoaded(true)} className={clsx("w-full h-full")} {...props} />
    </View>
  );
};

export default Image;
