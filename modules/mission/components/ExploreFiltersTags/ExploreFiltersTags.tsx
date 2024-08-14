import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Tag } from "@/components";
import { useTranslation } from "react-i18next";
import { UseFormReturn } from "react-hook-form";
import { ExploreFilters } from "@/mission/domain/ExploreFilters";
import { MissionType } from "@/mission/domain/MissionType";
import { MinistryType } from "@/ministry/domain/MinistryType";
import { useCallback } from "react";

export interface ExploreFiltersTagsProps {
  filters: UseFormReturn<ExploreFilters>;
}

type FilterEntry = [keyof ExploreFilters, MissionType[] | MinistryType[] | number];

const ExploreFiltersTags: React.FC<ExploreFiltersTagsProps> = ({ filters }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const values = filters.watch();

  const getLabel = useCallback(
    (filter: FilterEntry) => {
      const label = t(`mission.explore.filters.${filter[0]}`);
      let valueLabel;
      switch (filter[0]) {
        case "interests":
          valueLabel = (filter[1] as MissionType[])
            .map((interest: MissionType) => t(`mission.types.${interest}`))
            .join(", ");
          break;
        case "ministryType":
          valueLabel = (filter[1] as MinistryType[])
            .map((ministryType: MinistryType) => t(`ministry.types.${ministryType}`))
            .join(", ");
          break;
        case "distance":
          valueLabel = (filter[1] as number) + " km";
          break;
      }
      if (valueLabel.length > 30 && Array.isArray(filter[1]))
        valueLabel = t(`mission.explore.filters.selected`, { interests: filter[1].length });

      return `${label}: ${valueLabel}`;
    },
    [t]
  );

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "row",
        paddingHorizontal: 8,
        alignItems: "center",
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {(Object.entries(values) as FilterEntry[])
        .filter((filter) => !!filter[1] && (!Array.isArray(filter[1]) || filter[1].length))
        .map((filter) => (
          <Tag
            selected
            label={getLabel(filter)}
            color="indigo"
            key={filter[0]}
            className="px-3 py-2 mx-1 my-auto"
            icon="close"
            onPress={() => filters.resetField(filter[0] as keyof ExploreFilters)}
          />
        ))}
    </ScrollView>
  );
};
export default ExploreFiltersTags;
