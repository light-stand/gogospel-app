import { TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useTranslation } from "react-i18next";

import { TagCloud, UserPhoto, Text } from "@/components";
import { Mission } from "@/mission/domain/Mission";
import { missionTypes } from "@/mission/domain/MissionType";

type MissionSheetTitleProps = {
  mission: Mission;
  position: number;
};

export const MissionSheetTitle = ({ mission, position }: MissionSheetTitleProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { title, categories, user_profile } = mission;

  return (
    <>
      <Text className="text-2xl font-bold mb-1" numberOfLines={1}>
        {title}
      </Text>
      <View className="flex-row items-center w-full mb-2 overflow-hidden">
        <TouchableOpacity onPress={() => router.push(`/profile/${user_profile?.user_id}`)}>
          <View className="flex flex-row items-center w-full overflow-hidden ">
            <UserPhoto source={{ uri: user_profile?.images[0] }} className="h-6 w-6 mr-2" />
            {position >= 2 && (
              <Animated.View entering={FadeIn} exiting={FadeOut}>
                <Text className="text-base text-neutral-500 font-bold" numberOfLines={1}>
                  {user_profile?.name}
                </Text>
              </Animated.View>
            )}
          </View>
        </TouchableOpacity>
        {position < 2 && (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <TagCloud
              className="max-h-5 overflow-hidden"
              allSelected
              compact
              options={categories.map((category) => ({
                label: t(`mission.types.${category}`),
                value: category,
                color: missionTypes[category].color,
                icon: missionTypes[category].icon,
              }))}
            />
          </Animated.View>
        )}
      </View>
    </>
  );
};
