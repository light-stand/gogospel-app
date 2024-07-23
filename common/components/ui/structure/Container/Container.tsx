import React from "react";
import { View, Platform, KeyboardAvoidingView, ScrollView, ScrollViewProps } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
  type SafeAreaViewProps,
} from "react-native-safe-area-context";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IconButton } from "@/components/ui/actions/IconButton";

import { useRouter } from "expo-router";

export interface ContainerProps extends SafeAreaViewProps, ScrollViewProps {
  safeArea?: "all" | "none" | "ios" | "android";
  avoidKeyboard?: boolean;
  keyboardAware?: boolean;
  scroll?: boolean;
  style?: object[];
  showBack?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const BackButton = () => {
  const router = useRouter();

  return (
    <IconButton
      icon="chevron-left"
      onPress={router.back}
      size="medium"
      className="p-0 mr-auto mb-4"
    />
  );
};

const Container: React.FC<ContainerProps> = ({
  safeArea = "all",
  avoidKeyboard = true,
  keyboardAware = true,
  scroll = false,
  style,
  children,
  showBack,
  ...props
}) => {
  const { top } = useSafeAreaInsets();
  if (scroll) {
    const ScrollViewComponent = keyboardAware ? KeyboardAwareScrollView : ScrollView;

    const WrapperComponent = avoidKeyboard ? KeyboardAvoidingView : View;

    return (
      <WrapperComponent className="flex-1 bg-white" behavior="height">
        <ScrollViewComponent
          className="bg-white"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[style, { padding: 16, paddingTop: top + 16 }]}
          {...props}
        >
          {showBack && <BackButton />}
          {children}
        </ScrollViewComponent>
      </WrapperComponent>
    );
  }

  const isSafeArea =
    safeArea === "all" ||
    (safeArea === "ios" && Platform.OS === "ios") ||
    (safeArea === "android" && Platform.OS === "android");

  const ViewComponent = isSafeArea ? SafeAreaView : View;
  const WrapperComponent = avoidKeyboard ? KeyboardAvoidingView : View;

  return (
    <WrapperComponent className="flex-1 bg-white" behavior="padding">
      <ViewComponent style={style} className={"flex-1 bg-white p-4 flex"} {...props}>
        {showBack && <BackButton />}
        {children}
      </ViewComponent>
    </WrapperComponent>
  );
};

export default Container;
