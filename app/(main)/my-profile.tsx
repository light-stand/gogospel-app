import { useState } from "react";
import { View } from "react-native";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { Container, Icon, IconButton, Text } from "@/components";
import { UserPhoto } from "@/components/ui/structure/UserPhoto";
import { useUserStore } from "@/user/store/useUserStore";
import { getProfileOptions } from "@/user/domain/profileOptions";
import { useLogout } from "@/auth/application/useLogout";
import { ProfileOptions } from "@/user/components/ProfileOptions";
import VerifyCodeSheet from "@/user/components/VerifyCodeSheet";
import { useUserProfile } from "@/user/application/useUserProfile";

export default function MyProfile() {
  const router = useRouter();
  const [verifyCodeOpen, setVerifyCodeOpen] = useState(false);
  const { t } = useTranslation();
  const { user } = useUserStore();
  const logout = useLogout();

  const profile = useUserProfile();

  const actions = {
    logout,
    openVerificationCode: () => setVerifyCodeOpen(true),
  };

  const { name, images, created_at, is_verified } = profile;

  return (
    <Container scroll className="flex-1">
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
          <Text numberOfLines={2} ellipsizeMode="middle" className="font-bold text-3xl my-2 mr-1">
            {name}
            {is_verified && (
              <>
                {" "}
                <Icon name="check-decagram" className="text-amber-400 ml-2" />
              </>
            )}
          </Text>
        </View>
        {/*=Buttons=*/}
        <View className="flex-row justify-evenly w-full my-4">
          <View className="items-center">
            <IconButton
              icon="pencil"
              size="medium"
              variant="primary"
              className="mb-1"
              onPress={() => router.push("/profile/edit")}
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
      <ProfileOptions options={getProfileOptions(profile)} actions={actions} />
      <VerifyCodeSheet open={verifyCodeOpen} onClose={() => setVerifyCodeOpen(false)} />
    </Container>
  );
}
