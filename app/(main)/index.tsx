import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconButton } from "@/components";
import { MissionMap } from "@/mission/components/MissionMap";
import { useExploreMissions } from "@/mission/application/useExploreMissions";
import { MissionSwiper } from "@/mission/components/MissionSwiper";
import { ExploreFilters } from "@/mission/components/ExploreFilters";
import { MissionList } from "@/mission/components/MissionList";

export default function Explore() {
  const [showFilters, setShowFilters] = useState(false);
  const [mode, setMode] = useState<"list" | "map">("map");
  const { top } = useSafeAreaInsets();
  const { focused, missions, setFocused } = useExploreMissions();

  return (
    <>
      <IconButton
        icon="filter"
        variant="primary"
        className="absolute top-4 right-4 z-10 shadow-md"
        style={[{ marginTop: top }]}
        onPress={() => setShowFilters(true)}
      />
      <IconButton
        icon={mode === "map" ? "format-list-bulleted-type" : "map"}
        variant="primary"
        className="absolute top-4 left-4 z-10 shadow-md"
        style={[{ marginTop: top }]}
        onPress={() => setMode((p) => (p === "map" ? "list" : "map"))}
      />
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
      <ExploreFilters open={showFilters} onClose={() => setShowFilters(false)} />
    </>
  );
}
