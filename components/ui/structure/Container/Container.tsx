import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import {
  SafeAreaView,
  type SafeAreaViewProps
} from 'react-native-safe-area-context';

export interface ContainerProps extends SafeAreaViewProps {
  safeArea?: 'all' | 'none' | 'ios' | 'android';
  avoidKeyboard?: boolean;
  style?: object[];
  className?: string;
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  safeArea = 'all',
  avoidKeyboard = false,
  style,
  children,
  ...props
}) => {
  const isSafeArea =
    safeArea === 'all' ||
    (safeArea === 'ios' && Platform.OS === 'ios') ||
    (safeArea === 'android' && Platform.OS === 'android');

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
