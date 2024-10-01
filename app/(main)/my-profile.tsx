import dayjs from "dayjs";
import { View } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { Container, Icon, IconButton, Text } from "@/components";
import { UserPhoto } from "@/components/ui/structure/UserPhoto";
import { useUserStore } from "@/user/store/useUserStore";
import { profileOptions } from "@/user/domain/profileOptions";
import { useLogout } from "@/auth/application/useLogout";
import { ProfileOptions } from "@/user/components/ProfileOptions";
import { UserProfile } from "@/user/domain/User";

export default function MyProfile() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useUserStore();
  const logout = useLogout();

  const { profile } = user;

  const actions = {
    logout,
  };

  const { name, images, created_at, verified } = profile as UserProfile;

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
            <IconButton
              icon="pencil"
              size="medium"
              variant="primary"
              className="mb-1"
              onPress={() => router.push(`/profile/${user?.id}`)}
            />
            <Text className="mt-1 font-bold text-neutral-500">{t("user.profile.edit")}</Text>
          </View>
          <View className="items-center">
            <IconButton
              icon="heart"
              size="medium"
              variant="primary"
              className="mb-1"
              onPress={() => router.push("/mission/favorites")}
            />
            <Text className="mt-1 font-bold text-neutral-500">{t("user.profile.favorites")}</Text>
          </View>
        </View>
      </View>
      {/*=Options=*/}
      <ProfileOptions options={profileOptions} actions={actions} />
    </Container>
  );
}
