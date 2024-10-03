import { View } from "react-native";
import { capitalize } from "lodash";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { Icon, TagCloud, Text } from "@/components";
import { Mission } from "@/mission/domain/Mission";
import { missionTypes } from "@/mission/domain/MissionType";

type MissionSheetInfoProps = {
  mission: Mission;
};

export const MissionSheetInfo = ({ mission }: MissionSheetInfoProps) => {
  const { t } = useTranslation();

  const { start_date, categories, duration, distance, location_name } = mission;

  const info = [
    { icon: "calendar", text: dayjs(start_date as Date).format("DD/MM/YYYY") },
    {
      icon: "clock-time-eight-outline",
      text: capitalize(dayjs.duration(duration as number, "days").humanize()),
    },
    { icon: "map-marker", text: location_name },
    { icon: "map-marker-distance", text: t("maps.distance", { distance }) },
  ] as const;

  return (
    <>
      <TagCloud
        className="w-full my-2"
        allSelected
        options={categories.map((category) => ({
          label: t(`mission.types.${category}`),
          value: category,
          color: missionTypes[category].color,
          icon: missionTypes[category].icon,
        }))}
      />

      <View className="flex-row flex-wrap items-center gap-y-1">
        {info.map((item) => (
          <View key={item.icon} className="w-1/2 flex-row items-center px-1">
            <Icon name={item.icon} className="text-lg text-neutral-500 mr-1" />
            <Text className="flex-1 text-base font-semibold text-neutral-500" numberOfLines={1}>
              {item.text}
            </Text>
          </View>
        ))}
      </View>

      <Text className="text-base text-neutral-400 text-center my-4 w-full">
        {mission.description}
      </Text>
    </>
  );
};
