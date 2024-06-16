import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export interface ScrollContainerProps extends ScrollViewProps {
  keyboardAware?: boolean;
  style?: object[];
  className?: string;
  children: React.ReactNode;
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({
  keyboardAware = true,
  style,
  children,
  ...props
}) => {
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
};

export default ScrollContainer;
