import clsx from "clsx";
import { Fragment } from "react";
import { TouchableOpacity, View, ViewProps } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { Icon, Text } from "@/components";
import { MaterialIconType } from "@/components/ui/foundation/Icon/Icon";

export type ProfileOptions = {
  label?: string;
  items: {
    icon: MaterialIconType;
    label: string;
    href?: string;
    action?: "logout";
    disabled?: boolean;
  }[];
}[];

interface ProfileOptionsProps extends ViewProps {
  options: ProfileOptions;
  actions?: Record<string, VoidFunction>;
}

export const ProfileOptions = ({
  options,
  actions = {},
  style,
}: ProfileOptionsProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View className="justify-between" style={style}>
      {options.map((option, index) => (
        <Fragment key={index}>
          {option.label && <Text className="font-bold my-2">{t(option.label)}</Text>}
          {option.items.map(
            ({ icon, label, href, action, disabled }) =>
            (<TouchableOpacity
              key={label}
              disabled={disabled}
              onPress={href ? () => router.push(href) : action ? actions[action] : undefined}
              className={clsx(disabled && "opacity-50")}
            >
              <View className="flex-row items-center py-4 px-2">
                <Icon name={icon} className="mr-2 text-neutral-700" />
                <Text className="font-bold text-neutral-500">{t(label)}</Text>
                <Icon className="ml-auto" name="chevron-right" />
              </View>
            </TouchableOpacity>
            )
          )}
        </Fragment>
      ))}
    </View>
  );
};

export default ProfileOptions;
