import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "react-query";
import { capitalize, size, sortBy } from "lodash";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import Carousel from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text, Icon, Image, Button, Modal, TagCloud } from "@/components";
import { missionRepository } from "@/mission/interface/missionRepository";
import { Mission } from "@/mission/domain/Mission";
import { missionTypes } from "@/mission/domain/MissionType";
import { UserPhoto } from "@/components/ui/structure/UserPhoto";
import { useUserStore } from "@/user/store/useUserStore";
import { UserType } from "@/profiling/domain/Profiling";

const PAGE_WIDTH = Dimensions.get("window").width;

export default function EventDetails() {
  const router = useRouter();
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();
  const { user } = useUserStore();

  const { data: mission, isLoading } = useQuery({
    queryKey: ["mission", id],
    queryFn: () => missionRepository.getById(id as string, "*, ministry(name, images)"),
  });
  const { top } = useSafeAreaInsets();
  const [expanded, setExpanded] = useState(false);

  if (!mission) return null;

  const { start_date, title, ministry, categories, duration, images, location_name } =
    mission as Mission;

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ minHeight: "100%", paddingBottom: 32 }}>
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute right-4 z-50"
        style={{ top: top }}
      >
        <Icon name="window-close" />
      </TouchableOpacity>
      {isLoading && <Text className="text-white">Loading...</Text>}
      <View style={{ height: PAGE_WIDTH / 1.5 }}>
        {!!size(images) ? (
          <Carousel
            data={images as string[]}
            width={PAGE_WIDTH}
            height={PAGE_WIDTH / 1.5}
            renderItem={({ index, item }) => (
              <Image className="h-full" key={index} source={{ uri: item }} />
            )}
          />
        ) : (
          <Image className="h-full" source={{ uri: ministry?.images[0] }} />
        )}
        <View
          pointerEvents="none"
          className="absolute flex justify-end z-20 t-0 w-full"
          style={{ height: PAGE_WIDTH / 1.5 }}
        ></View>
      </View>
      <View className="gap-y-2 p-4">
        <Text className="text-3xl font-bold" numberOfLines={2}>
          {title}
        </Text>
        <View className="flex flex-row items-center gap-x-2">
          <UserPhoto source={{ uri: ministry?.images[0] }} className="h-6 w-6" />
          <Text bold className="text-neutral-600 font-semibold" numberOfLines={1}>
            {ministry?.name}
          </Text>
        </View>
        <View className="flex-row items-center gap-x-1">
          <Icon name="calendar" className="text-neutral-500 text-base" />
          <Text bold className="text-md text-neutral-500">
            {dayjs(start_date as Date).format("DD/MM/YYYY")}
          </Text>
          <Icon name="clock-time-eight-outline" className="text-base text-neutral-500" />
          <Text bold className="text-md  text-neutral-500">
            {capitalize(dayjs.duration(duration as number, "days").humanize())}
          </Text>
        </View>
        <View className="flex-row items-center gap-x-1">
          <Icon name="map-marker" className="text-base text-neutral-500" />
          <Text bold className="text-md  text-neutral-500 font-semibold">
            {location_name}
          </Text>
        </View>
        <View className="flex-1">
          <TagCloud
            allSelected
            options={categories.map((category) => ({
              label: t(`mission.types.${category}`),
              value: category,
              color: missionTypes[category].color,
              icon: missionTypes[category].icon,
            }))}
          />
          <TouchableWithoutFeedback onPress={() => setExpanded((prev) => !prev)}>
            <Text
              className="text-base text-neutral-400 text-center mb-4"
              numberOfLines={expanded ? undefined : 4}
            >
              {mission.description}
            </Text>
          </TouchableWithoutFeedback>
          {user.type === UserType.Missionary && (
            <Button
              label={t("mission.actions.join")}
              className="mt-auto"
              onPress={() => router.push(`connections/request/${id}`)}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
