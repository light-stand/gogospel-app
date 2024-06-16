import React from "react";
import {
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ScrollViewProps,
} from "react-native";
import {
  SafeAreaView,
  type SafeAreaViewProps,
} from "react-native-safe-area-context";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export interface ContainerProps extends SafeAreaViewProps, ScrollViewProps {
  safeArea?: "all" | "none" | "ios" | "android";
  avoidKeyboard?: boolean;
  keyboardAware?: boolean;
  scroll?: boolean;
  style?: object[];
  className?: string;
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  safeArea = "all",
  avoidKeyboard = false,
  keyboardAware = true,
  scroll = false,
  style,
  children,
  ...props
}) => {
  if (scroll) {
    const ScrollViewComponent = keyboardAware
      ? KeyboardAwareScrollView
      : ScrollView;

    return (
      <ScrollViewComponent
        className="flex-1 bg-background"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={style}
        {...props}
      >
        {children}
      </ScrollViewComponent>
    );
  }

  const isSafeArea =
    safeArea === "all" ||
    (safeArea === "ios" && Platform.OS === "ios") ||
    (safeArea === "android" && Platform.OS === "android");

  const ViewComponent = isSafeArea ? SafeAreaView : View;
  const WrapperComponent = avoidKeyboard ? KeyboardAvoidingView : View;

  return (
    <WrapperComponent className="flex-1 bg-background" behavior="padding">
      <ViewComponent
        style={style}
        className="flex-1 bg-background p-4"
        {...props}
      >
        {children}
      </ViewComponent>
    </WrapperComponent>
  );
};

export default Container;
