import React from "react";
import dayjs from "dayjs";
import { TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";

import { Icon, Text, Button, Image, TagCloud } from "@/components";
import { Mission } from "@/mission/domain/Mission";
import { missionTypes } from "@/mission/domain/MissionType";
import { useTranslation } from "react-i18next";

export interface MissionCardProps {
  mission: Mission;
  style?: object;
  className?: string;
  from?: string;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission, style, from }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const onCardPress = () => {
    router.push(`/event/${mission.id}?from=${from}`);
  };

  if (!mission.id) return null;

  const mock = {
    gallery: ["https://picsum.photos/200/300"],
  };

  const { start_date, end_date, title, ministry, categories, duration } = mission;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onCardPress}>
      <Animated.View className={"bg-white rounded-2xl p-4 shadow-md w-full"} style={style}>
        <View className="flex-row justify-between w-full gap-x-4">
          <View className="h-full aspect-square max-w-1/3 rounded-2xl overflow-hidden">
            <Image source={mock.gallery && { uri: mock.gallery[0] }} className="h-full" />
          </View>
          <View className="flex-col flex-1 items-start justify-between">
            <Text className="text-2xl font-extrabold text-start" numberOfLines={1}>
              {title}
            </Text>
            <View className="flex flex-row items-center w-full">
              <View className="flex flex-row items-center w-1/2">
                <Icon name="church" className="mr-2 text-neutral-600 text-base" />
                <Text bold className="text-neutral-600 font-bold text-md w-full" numberOfLines={1}>
                  {ministry.name}
                </Text>
              </View>
              {!start_date && duration && (
                <View className="flex flex-row items-center">
                  <Icon name="clock" className="mr-2 text-neutral-500 text-base" />
                  <Text className="text-md text-neutral-500 font-bold">
                    {dayjs.duration(duration, "days").humanize()}
                  </Text>
                </View>
              )}
              {start_date && end_date && (
                <View className="flex flex-row items-center">
                  <Icon name="clock" className="mr-2 text-neutral-500 text-base" />
                  <Text className="text-md text-neutral-500 font-bold">
                    {dayjs.duration(dayjs(end_date).diff(start_date)).humanize()}
                  </Text>
                </View>
              )}
            </View>
            <View className="flex flex-row items-center flex-wrap max-h-10">
              <TagCloud
                compact
                allSelected
                options={categories.map((category) => ({
                  label: t(`mission.types.${category}`),
                  value: category,
                  color: missionTypes[category].color,
                  icon: missionTypes[category].icon,
                }))}
              />
            </View>
            {/* <View className="flex flex-row items-center">
              <Icon name="calendar-month" className="mr-2 text-neutral-500 text-base" />
              <Text className="text-md text-neutral-500 font-bold">
                {dayjs(start_date).format("D MMM")} - {dayjs(end_date).format("D MMM")}
              </Text>
            </View> */}
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};
export default MissionCard;
