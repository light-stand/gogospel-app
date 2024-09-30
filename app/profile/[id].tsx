import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Container, Icon, ImagePicker, TagCloud, Text } from "@/components";
import { ProfileOptions } from "@/user/components/ProfileOptions";
import { publicProfileOptions } from "@/user/domain/profileOptions";
import { missionTypes } from "@/mission/domain/MissionType";
import { useUserProfile } from "@/user/application/useUserProfile";

export default function Profile() {
  const { t } = useTranslation();
  const { form, profileData, isOwn } = useUserProfile();

  const { name, description, verified, interests } = profileData;

  return (
    <Container showBack scroll>
      <ImagePicker control={form.control} name="image" disabled={!isOwn} icon="pencil" />
      <View className="flex-row items-center">
        <Text numberOfLines={1} className="mt-4 text-center w-full">
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
