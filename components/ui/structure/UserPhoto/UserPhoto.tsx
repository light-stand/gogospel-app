import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ImageSourcePropType,
  Platform,
  ImageURISource
} from 'react-native';
import classNames from 'classnames';
import Image from '../Image/Image';
import Text from '../../foundation/Text/Text';
import ButtonIcon from '../../actions/ButtonIcon/ButtonIcon';
import Icon from '../../foundation/Icon/Icon';
import UserStatus from '../../feedback/UserStatus/UserStatus';
import { ButtonIconProps } from '../../actions/ButtonIcon/ButtonIcon';

export interface UserPhotoProps {
  source: ImageSourcePropType | ImageURISource;
  label?: string;
  isOnline?: undefined | true | false;
  instantConnect?: boolean;
  blur?: boolean;
  buttonIcon?: 'undo' | 'edit' | 'delete';
  onPress?: VoidFunction;
  onButtonPress?: VoidFunction;
  style?: object[];
  className?: string;
}

const UserPhoto: React.FC<UserPhotoProps> = ({
  source,
  label,
  isOnline = undefined,
  instantConnect = false,
  blur = false,
  buttonIcon,
  onPress,
  onButtonPress,
  style
}) => {
  const [size, setSize] = useState(0);
  const [loadFailed, setLoadFailed] = useState(false);

  const buttonProps = {
    edit: {
      icon: 'pencil',
      variant: 'primary'
    },
    delete: {
      icon: 'delete',
      variant: 'primary'
    },
    undo: {
      icon: 'undo-variant',
      variant: 'tertiary'
    }
  }[buttonIcon as string];

  //TODO: TEMP FIX
  //some old GCS images are single resolution
  //use loadFailed to fallback to full image if image component gives us error
  const loadResolution =
    !size || loadFailed ? null : size <= 64 ? 'sm' : size <= 200 ? 'md' : null;

  const blurAmount = Platform.OS === 'ios' ? 7 : 7;

  const sourceUri = source as ImageURISource;

  //TODO: TEMP FIX workaround to avoid error on mock unsplash images
  const imageSource =
    loadResolution && sourceUri.uri?.includes('storage.googleapis.com')
      ? {
          uri: sourceUri.uri.replace('.jpg', `-${loadResolution}.jpg`)
        }
      : source;

  return (
    <TouchableOpacity
      style={style}
      className={classNames('items-center')}
      onPress={onPress}
      activeOpacity={0.5}
      onLayout={event => {
        const { height, width } = event.nativeEvent.layout;
        setSize(height || width);
      }}
    >
      <View className={classNames('w-full')}>
        {/* prevent the image from loading on first render before size is provided */}
        {!!size && (
          <Image
            source={imageSource}
            blurRadius={blur ? blurAmount : undefined}
            className={classNames('rounded-full aspect-square')}
            onError={() => setLoadFailed(true)}
          />
        )}
        {buttonIcon && (
          <ButtonIcon
            size="small"
            className="absolute bottom-0 right-0"
            onPress={onButtonPress}
            {...(buttonProps as ButtonIconProps)}
          />
        )}
      </View>
      {label && (
        <Text size="h6" className="text-gray-3 mt-[6] text-center">
          {label}
          {instantConnect && (
            <Icon name="lightning-bolt" className="text-h5 text-success" />
          )}
          {isOnline !== undefined && (
            <UserStatus isOnline={isOnline} className="pl-1 pb-[3]" />
          )}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default UserPhoto;
