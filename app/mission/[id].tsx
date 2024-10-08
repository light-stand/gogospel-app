import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconButton, Container } from "@/components";
import { useMissionDetails } from "@/mission/application/useMissionDetails";
import { MissionSheetTitle } from "@/mission/components/MissionSheet/partials/MissionSheetTitle";
import { MissionSheetCarousel } from "@/mission/components/MissionSheet/partials/MissionSheetCarousel";
import { MissionSheetInfo } from "@/mission/components/MissionSheet/partials/MissionSheetInfo";
import { MissionSheetActions } from "@/mission/components/MissionSheet/partials/MissionSheetActions";
import { useUserStore } from "@/user/store/useUserStore";

export default function EventDetails() {
  const id = parseInt(useLocalSearchParams().id as string);
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useUserStore();
  const { mission } = useMissionDetails(id);

  if (!mission) return null;
  const { created_by } = mission;

  return (
    <>
      <Container showBack scroll>
        <MissionSheetTitle mission={mission} position={3} />
        <MissionSheetCarousel mission={mission} />
        <MissionSheetInfo mission={mission} />
        <MissionSheetActions mission={mission} />
      </Container>
      {created_by === user.id && (
        <IconButton
          className="absolute bottom-4 right-4"
          style={[{ marginBottom: bottom }]}
          variant="primary"
          size="medium"
          icon="pencil"
          onPress={() => router.push(`/mission/edit/${mission.id}`)}
        />
      )}
    </>
  );
}
