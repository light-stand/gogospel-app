import { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconButton, Tag } from "@/components";
import { MissionMap } from "@/mission/components/MissionMap";
import { defaultFilters, useExploreMissions } from "@/mission/application/useExploreMissions";
import { MissionSwiper } from "@/mission/components/MissionSwiper";
import { ExploreFilters } from "@/mission/components/ExploreFilters";
import { MissionList } from "@/mission/components/MissionList";
import { ExploreFiltersTags } from "@/mission/components/ExploreFiltersTags";

export default function Explore() {
  const { top } = useSafeAreaInsets();
  const [showFilters, setShowFilters] = useState(false);
  const [mode, setMode] = useState<"list" | "map">("map");
  const { focused, missions, setFocused, filters } = useExploreMissions();

  const filtersCount = Object.entries(filters.getValues()).filter(
    (filter) => !!filter[1] && (!Array.isArray(filter[1]) || filter[1].length)
  ).length;

  return (
    <>
      <View className="px-4 absolute top-4 z-10 flex-row w-full" style={[{ marginTop: top }]}>
        <IconButton
          icon={mode === "map" ? "format-list-bulleted-type" : "map"}
          variant="primary"
          className="z-10 shadow-md mr-auto"
          onPress={() => setMode((p) => (p === "map" ? "list" : "map"))}
        />
        {filtersCount > 0 && (
          <Tag
            selected
            label={filtersCount.toString()}
            color="red"
            className="px-3 mr-1 my-auto"
            icon="filter-off"
            onPress={() => filters.reset(defaultFilters)}
          />
        )}
        <IconButton
          icon="filter"
          variant="primary"
          className="z-10 shadow-md"
          onPress={() => setShowFilters(true)}
        />
      </View>
      {mode === "map" && (
        <>
          <MissionMap missions={missions} focused={focused} setFocused={setFocused} />
          <MissionSwiper
            className="absolute bottom-0"
            missions={missions || []}
            focusedEvent={focused}
            onPlanSelected={setFocused}
          />
        </>
      )}
      {mode === "list" && <MissionList missions={missions || []} />}
      <ExploreFilters open={showFilters} onClose={() => setShowFilters(false)} filters={filters} />
    </>
  );
}
