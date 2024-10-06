import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconButton, Container } from "@/components";
import { useMissionDetails } from "@/mission/application/useMissionDetails";
import { MissionSheetTitle } from "@/mission/components/MissionSheet/partials/MissionSheetTitle";
import { MissionSheetCarousel } from "@/mission/components/MissionSheet/partials/MissionSheetCarousel";
import { MissionSheetInfo } from "@/mission/components/MissionSheet/partials/MissionSheetInfo";
import { MissionSheetActions } from "@/mission/components/MissionSheet/partials/MissionSheetActions";

export default function EventDetails() {
  const id = parseInt(useLocalSearchParams().id as string);
  const { mission } = useMissionDetails(id);

  if (!mission) return null;

  return (
    <Container className="flex-1" showBack scroll>
      <MissionSheetTitle mission={mission} position={3} />
      <MissionSheetCarousel mission={mission} />
      <MissionSheetInfo mission={mission} />
      <MissionSheetActions mission={mission} />
    </Container>
  );
}
