import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Container, Icon, ImagePicker, TagCloud, Text, UserPhoto } from "@/components";
import { ProfileOptions } from "@/user/components/ProfileOptions";
import { publicProfileOptions } from "@/user/domain/profileOptions";
import { missionTypes } from "@/mission/domain/MissionType";
import { useUserProfile } from "@/user/application/useUserProfile";
import { useLocalSearchParams } from "expo-router";

export default function Profile() {
  const { t } = useTranslation();
  const id = useLocalSearchParams().id as string;
  const { name, is_verified, images, description } = useUserProfile(id);

  return (
    <Container showBack scroll>
      <UserPhoto source={{ uri: images[0] }} disabled className="w-1/2 mx-auto" />
      <View className="flex-row items-center mt-4 justify-center">
        <Text numberOfLines={2} className="font-bold text-3xl text-center" ellipsizeMode="middle">
          {name}
          {is_verified && (
            <>
              {" "}
              <Icon name="check-decagram" className="text-amber-400 ml-2" />
            </>
          )}
        </Text>
      </View>
      {/* <TagCloud
        compact
        allSelected
        options={interests?.map((category) => ({
          label: t(`mission.types.${category}`),
          value: category,
          color: missionTypes[category].color,
          icon: missionTypes[category].icon,
        }))}
        className="mt-4"
      /> */}
      <Text className="mt-4 px-2 text-center text-neutral-500">{description}</Text>
      <ProfileOptions options={publicProfileOptions} className="mt-4" />
    </Container>
  );
}
