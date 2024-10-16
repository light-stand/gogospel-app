import { useState } from "react";
import { View } from "react-native";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { Container, Icon, Text } from "@/components";
import { UserPhoto } from "@/components/ui/structure/UserPhoto";
import { getProfileOptions } from "@/user/domain/profileOptions";
import { useLogout } from "@/auth/application/useLogout";
import { ProfileOptions } from "@/user/components/ProfileOptions";
import VerifyCodeSheet from "@/user/components/VerifyCodeSheet";
import { useUserProfile } from "@/user/application/useUserProfile";

export default function MyProfile() {
  const [verifyCodeOpen, setVerifyCodeOpen] = useState(false);
  const { t } = useTranslation();
  const logout = useLogout();

  const profile = useUserProfile();

  const actions = {
    logout,
    openVerificationCode: () => setVerifyCodeOpen(true),
  };

  const { name, images, created_at, is_verified } = profile;

  return (
    <>
      <Container scroll>
        {/*=UserInfo+Buttons=*/}
        <View className="items-start justify-between gap-y-4 px-4">
          {/*=Image=*/}
          <View className="flex-row items-center w-full">
            <UserPhoto
              className="h-36 w-36 rounded-full"
              source={{ uri: (images as string[])[0] }}
            />
            <View className="justify-center items-center mx-auto">
              <Text className="text-neutral-500 font-bold">{t("user.profile.joined")}</Text>
              <Text className="capitalize font-bold">{dayjs(created_at).fromNow()}</Text>
            </View>
          </View>
          {/*=Name=*/}
          <View className="flex-row items-center mb-4">
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
        </View>
        {/*=Options=*/}
        <ProfileOptions options={getProfileOptions(profile)} actions={actions} />
      </Container>
      <VerifyCodeSheet open={verifyCodeOpen} onClose={() => setVerifyCodeOpen(false)} />
    </>
  );
}
