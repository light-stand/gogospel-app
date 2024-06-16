import React from 'react';
import { TextStyle, TouchableHighlight } from 'react-native';
import { theme } from '../../../tailwind.config';
import Icon, { MaterialIconType } from '../../foundation/Icon/Icon';

import classNames from 'classnames';

export interface ButtonIconProps {
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'transparent';
  size?: 'medium' | 'small';
  disabled?: boolean;
  icon: MaterialIconType;
  onPress?: () => void;
  style?: any[];
  className?: string;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  variant = 'transparent',
  size = 'small',
  disabled = false,
  icon,
  onPress = () => {},
  style
}) => {
  const { colors } = theme;

  const containedStyling = {
    primary: {
      disabled: 'bg-primary-dark-1',
      enabled: 'bg-primary'
    },
    secondary: {
      disabled: 'bg-gray-1',
      enabled: 'bg-gray-1 border border-gray-4'
    },
    tertiary: {
      disabled: 'bg-gray-1',
      enabled: 'bg-gray-1 opacity-80'
    },
    success: {
      disabled: 'bg-success-dark',
      enabled: 'bg-success'
    },
    warning: {
      disabled: 'bg-warning-dark',
      enabled: 'bg-warning'
    },
    danger: {
      disabled: 'bg-danger-dark',
      enabled: 'bg-danger'
    },
    transparent: {
      disabled: 'bg-tranparent',
      enabled: ''
    }
  }[variant][disabled ? 'disabled' : 'enabled'];

  const underlayColor = {
    primary: colors.primary['light-1'],
    secondary: colors.gray[2],
    tertiary: colors.gray[2],
    success: colors.success.light,
    warning: colors.success.light,
    danger: colors.danger.light,
    transparent: '#00000030'
  }[variant];

  const containedPaddingStyling = {
    small: 'p-2',
    medium: 'p-4'
  }[size];

  return (
    <TouchableHighlight
      onPress={onPress}
      disabled={disabled}
      underlayColor={underlayColor}
      className={classNames(
        containedStyling,
        containedPaddingStyling,
        'rounded-full',
        'flex',
        'justify-center',
        'flex-row',
        'items-center',
        'self-center'
      )}
      style={style}
    >
      <Icon
        name={icon}
        style={style?.find(e => e.color)}
        className={classNames(
          disabled && 'text-background',
          size === 'medium' ? 'text-h1' : 'text-h3',
          variant === 'warning' && 'text-background'
        )}
      />
    </TouchableHighlight>
  );
};

export default ButtonIcon;
