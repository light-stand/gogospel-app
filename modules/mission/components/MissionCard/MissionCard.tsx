import React, { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { capitalize, sortBy } from "lodash";

import { Icon, Text, Button, Image, TagCloud } from "@/components";
import { Mission } from "@/mission/domain/Mission";
import { missionTypes } from "@/mission/domain/MissionType";
import { useTranslation } from "react-i18next";
import { getLocation } from "@/maps/interface/mapsService";
import { haversineDistance } from "@/maps/utils/distance";

export interface MissionCardProps {
  mission: Mission;
  style?: object;
  className?: string;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission, style }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [distance, setDistance] = React.useState<number | null>(null);

  const onCardPress = () => {
    router.push(`/mission/${mission.id}`);
  };

  const getMissionDistance = async () => {
    const userLocation = await getLocation();
    if (!userLocation || !mission.lat || !mission.long) return;
    const distance = haversineDistance(
      userLocation?.latitude,
      userLocation?.longitude,
      mission.lat,
      mission.long
    );
    setDistance(Math.floor(distance));
  };

  useEffect(() => {
    getMissionDistance();
  }, []);

  if (!mission.id) return null;

  const { title, categories, duration, images, user_profile } = mission;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onCardPress} style={style}>
      <View className="bg-white p-3 w-full border-b border-neutral-300">
        <View className="flex-row justify-between w-full gap-x-3">
          <View className="max-h-full aspect-square rounded-2xl overflow-hidden my-auto">
            <Image
              source={{ uri: images ? images[0] : user_profile?.images[0] }}
              className="flex-1"
            />
          </View>
          <View className="flex-col flex-1 items-start justify-between">
            <Text className="text-lg font-bold" numberOfLines={1}>
              {title}
            </Text>
            <View className="flex w-full">
              <View className="flex flex-row items-center">
                <Icon name="church" className="mr-2 text-neutral-500 text-base" />
                <Text bold className="text-neutral-500 font-bold w-full" numberOfLines={1}>
                  {user_profile?.name}
                </Text>
              </View>
              {duration && (
                <View className="flex flex-row items-center">
                  <Icon name="clock" className="mr-1 text-neutral-500 text-base" />
                  <Text className="text-md text-neutral-500 font-bold">
                    {capitalize(dayjs.duration(duration, "days").humanize())}
                  </Text>
                  <Icon name="map-marker" className="mx-1 text-neutral-500 text-base" />
                  <Text className="text-md text-neutral-500 font-bold">
                    {t("maps.distance", { distance })}
                  </Text>
                </View>
              )}
              {/* {start_date && end_date && (
                <View className="flex flex-row items-center">
                  <Icon name="clock" className="mr-2 text-neutral-500 text-base" />
                  <Text className="text-md text-neutral-500 font-bold">
                    {dayjs.duration(dayjs(end_date).diff(start_date)).humanize()}
                  </Text>
                </View>
              )} */}
            </View>
            <ScrollView className="h-5 mt-1" showsVerticalScrollIndicator={false}>
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
            </ScrollView>
            {/* <View className="flex flex-row items-center">
              <Icon name="calendar-month" className="mr-2 text-neutral-500 text-base" />
              <Text className="text-md text-neutral-500 font-bold">
                {dayjs(start_date).format("D MMM")} - {dayjs(end_date).format("D MMM")}
              </Text>
            </View> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default MissionCard;
