import React, { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { capitalize, sortBy } from "lodash";

import { Testimony } from "../domain/Testimony";
import { Icon, Text, Button, Image, TagCloud } from "@/components";
import { Mission } from "@/mission/domain/Mission";
import { missionTypes } from "@/mission/domain/MissionType";
import { useTranslation } from "react-i18next";
import { getLocation } from "@/maps/interface/mapsService";
import { haversineDistance } from "@/maps/utils/distance";

type TestimonyListProps = {
  testimony: Testimony;
};

export const TestimonyItem = ({ testimony }: TestimonyListProps) => {
  const { title, description, mission_id } = testimony;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
      <View className="bg-white p-3 w-full border-b border-neutral-300">
        <View className="flex-row justify-between w-full gap-x-3">
          <View className="flex-col flex-1 items-start justify-between">
            <Text className="text-lg font-bold" numberOfLines={1}>
              {title}
            </Text>
            <View className="flex w-full">
              <View className="flex flex-row items-center">
                <Icon name="church" className="mr-2 text-neutral-500 text-base" />
                <Text bold className="text-neutral-500 font-bold w-full" numberOfLines={1}>
                  {title}
                </Text>
              </View>
              {/* {start_date && end_date && (
            <View className="flex flex-row items-center">
              <Icon name="clock" className="mr-2 text-neutral-500 text-base" />
              <Text className="text-md text-neutral-500 font-bold">
                {dayjs.duration(dayjs(end_date).diff(start_date)).humanize()}
              </Text>
            </View>
          )} */}
            </View>
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
