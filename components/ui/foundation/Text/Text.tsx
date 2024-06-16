import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import classNames from 'classnames';

export interface TextProps extends RNTextProps {
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7';
  bold?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: object;
}

const Text: React.FC<TextProps> = ({
  size = 'h6',
  bold,
  children,
  style,
  ...props
}) => {
  return (
    <RNText
      className={classNames(
        {
          'text-h1': size === 'h1',
          'text-h2': size === 'h2',
          'text-h3': size === 'h3',
          'text-h4': size === 'h4',
          'text-h5': size === 'h5',
          'text-h6': size === 'h6',
          'text-h7': size === 'h7'
        },
        bold ? 'font-sans-bold' : 'font-sans',
        'text-white'
      )}
      style={style}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default Text;
