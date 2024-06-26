import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";
import clsx from "clsx";

export interface TextProps extends RNTextProps {
  bold?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: object;
}

const Text: React.FC<TextProps> = ({ bold, children, style, ...props }) => {
  return (
    <RNText
      className={clsx(bold ? "font-sans-bold" : "font-sans", "text-black")}
      style={style}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default Text;
