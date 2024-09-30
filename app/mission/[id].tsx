import React, { useState } from "react";
import {
  View,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { capitalize, size } from "lodash";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import Carousel from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text, Icon, Image, Button, TagCloud, IconButton } from "@/components";
import { missionTypes } from "@/mission/domain/MissionType";
import { UserPhoto } from "@/components/ui/structure/UserPhoto";
import { useUserStore } from "@/user/store/useUserStore";
import { LinearGradient } from "expo-linear-gradient";
import { useMissionDetails } from "@/mission/application/useMissionDetails";
import { useFavoriteActions } from "@/mission/application/useFavoriteActions";

const PAGE_WIDTH = Dimensions.get("window").width;

export default function EventDetails() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useUserStore();
  const id = parseInt(useLocalSearchParams().id as string);

  const { top } = useSafeAreaInsets();
  const [expanded, setExpanded] = useState(false);

  const { mission, isLoading, isFavorite } = useMissionDetails(id);

  const { addFavorite, removeFavorite } = useFavoriteActions();

  const toggleFavorite = () => {
    isFavorite ? removeFavorite(id) : addFavorite(id);
  };

  if (!mission) return null;

  const { user_profile, start_date, title, categories, duration, images, location_name } = mission;

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ minHeight: "100%", paddingBottom: 32 }}>
      <IconButton
        icon="window-close"
        className="absolute right-4 z-50 text-white"
        onPress={() => router.back()}
        style={[{ top: top }]}
      />
      <IconButton
        icon={isFavorite ? "heart" : "heart-outline"}
        size="small"
        className="absolute right-14 z-50 text-white"
        onPress={toggleFavorite}
        style={[{ top: top }]}
      />
      <LinearGradient
        colors={["#00000099", "#00000044", "#00000000"]}
        className="absolute top-0 w-full h-24 z-20"
      />
      {isLoading && <Text className="text-white">Loading...</Text>}
      <View style={{ height: PAGE_WIDTH / 1.3 }}>
        {!!size(images) ? (
          <Carousel
            data={images as string[]}
            width={PAGE_WIDTH}
            height={PAGE_WIDTH / 1.3}
            renderItem={({ index, item }) => (
              <Image className="h-full" key={index} source={{ uri: item }} />
            )}
          />
        ) : (
          <Image className="h-full" source={{ uri: user_profile?.images[0] }} />
        )}
        <View
          pointerEvents="none"
          className="absolute flex justify-end z-20 t-0 w-full"
          style={{ height: PAGE_WIDTH / 1.3 }}
        ></View>
      </View>
      <View className="gap-y-2 p-4">
        <Text className="text-3xl font-bold" numberOfLines={2}>
          {title}
        </Text>
        <TouchableOpacity onPress={() => router.push(`/profile/${user_profile?.id}`)}>
          <View className="flex flex-row items-center gap-x-2">
            <UserPhoto source={{ uri: user_profile?.images[0] }} className="h-6 w-6" />
            <Text bold className="text-neutral-600 font-semibold" numberOfLines={1}>
              {user_profile?.name}
            </Text>
          </View>
        </TouchableOpacity>
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
          <Button
            label={t("mission.actions.join")}
            className="mt-auto"
            onPress={() => router.push(`/connections/request/${id}`)}
          />
        </View>
      </View>
    </ScrollView>
  );
}
