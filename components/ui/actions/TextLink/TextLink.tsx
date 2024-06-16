import React from 'react';
import { TouchableOpacity } from 'react-native';
import Text from '../../foundation/Text/Text';

export interface TextLinkProps {
  label: string;
  disabled?: boolean;
  align?: 'left' | 'center' | 'right';
  onPress?: () => void;
  style?: object[];
  className?: string;
}

const alignment = {
  left: 'self-start',
  center: 'self-center',
  right: 'self-end'
};

const TextLink: React.FC<TextLinkProps> = ({
  label,
  align = 'left',
  disabled = false,
  onPress = () => {},
  style
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={alignment[align]}
    >
      <Text style={style}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextLink;
