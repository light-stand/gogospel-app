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

type FilterEntry = [keyof ExploreFilters, MissionType[] | MinistryType[]];

const ExploreFiltersTags: React.FC<ExploreFiltersTagsProps> = ({ filters }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const values = filters.watch();

  const getLabel = useCallback(
    (filter: FilterEntry) => {
      const label = t(`mission.explore.filters.${filter[0]}`);
      let valueLabel = {
        interests: filter[1].map((interest: string) => t(`mission.types.${interest}`)).join(", "),
        ministryType: filter[1]
          .map((ministryType: string) => t(`ministry.types.${ministryType}`))
          .join(", "),
      }[filter[0] as keyof ExploreFilters];

      if (valueLabel.length > 30)
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
        .filter((filter) => !!filter[1])
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
