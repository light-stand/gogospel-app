import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";
import clsx from "clsx";

export interface TextProps extends RNTextProps {
  bold?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: object;
}

export const Text: React.FC<TextProps> = ({ bold, children, style, ...props }) => {
  return (
    <RNText className={clsx("text-neutral-700 font-medium")} style={style} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
