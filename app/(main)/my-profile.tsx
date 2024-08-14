import clsx from "clsx";
import dayjs from "dayjs";
import { TouchableOpacity, View } from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Container, Icon, IconButton, Text } from "@/components";
import { UserPhoto } from "@/components/ui/structure/UserPhoto";
import { UserType } from "@/profiling/domain/Profiling";
import { useUserStore } from "@/user/store/useUserStore";
import { profileOptions } from "@/user/domain/profileOptions";
import { useLogout } from "@/auth/application/useLogout";

export default function MyProfile() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useUserStore();
  const { top } = useSafeAreaInsets();
  const logout = useLogout();

  const { ministry, missionary, type } = user;

  const data = {
    missionary: {
      images: missionary?.images,
      name: [missionary?.first_name, missionary?.last_name].join(" "),
      created_at: missionary?.created_at,
      verified: false,
    },
    ministry: {
      images: ministry?.images,
      name: ministry?.name,
      created_at: ministry?.created_at,
      verified: ministry?.verified,
    },
  }[type as UserType];

  const actions = {
    logout: () => logout(),
  };

  const { name, images, created_at, verified } = data;

  return (
    <Container scroll>
      {/*=UserInfo+Buttons=*/}
      <View className="items-start justify-between gap-y-4 px-4">
        {/*=Image=*/}
        <View className="flex-row items-center w-full">
          <UserPhoto className="h-36 w-36 rounded-full" source={{ uri: (images as string[])[0] }} />
          <View className="justify-center items-center mx-auto">
            <Text className="text-neutral-500 font-bold">{t("user.profile.joined")}</Text>
            <Text className="capitalize font-bold">{dayjs(created_at).fromNow()}</Text>
          </View>
        </View>
        {/*=Name=*/}
        <View className="flex-row items-center">
          <Text numberOfLines={1} className="my-2 mr-1">
            <Text className="font-bold text-3xl">{name?.split(" ")[0]}</Text>
            {name?.split(" ")[1] && (
              <>
                {" "}
                <Text className="font-bold text-3xl text-neutral-400">{name?.split(" ")[1]}</Text>
              </>
            )}
          </Text>
          {verified && <Icon name="check-decagram" className="text-indigo-500" />}
        </View>
        {/*=Buttons=*/}
        <View className="flex-row justify-evenly w-full my-4">
          <View className="items-center">
            <Link href="/settings/edit" asChild>
              <IconButton icon="pencil" size="medium" variant="primary" className="mb-1" disabled />
            </Link>
            <Text className="mt-1 font-bold text-neutral-500">{t("user.profile.edit")}</Text>
          </View>
          <View className="items-center">
            <Link href="/settings/interests" asChild>
              <IconButton icon="heart" size="medium" variant="primary" className="mb-1" disabled />
            </Link>
            <Text className="mt-1 font-bold text-neutral-500">{t("user.profile.favorites")}</Text>
          </View>
        </View>
      </View>
      {/*=Options=*/}
      <View className="justify-between">
        {profileOptions.map((option) => (
          <>
            <Text className="font-bold my-2">{t(option.label)}</Text>
            {option.items.map(
              ({ icon, label, href, userType, action, disabled }) =>
                (!userType || userType === type) && (
                  <TouchableOpacity
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
          </>
        ))}
      </View>
    </Container>
  );
}
