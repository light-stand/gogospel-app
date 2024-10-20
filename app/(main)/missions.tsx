import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

import { Container, IconButton, Text, ButtonBar } from "@/components";
import { useListMissions } from "@/mission/application/useListMissions";
import { MissionList } from "@/mission/components/MissionList";
import { NoResults } from "@/components/ui/feedback/NoResults";
import { missionListTypes } from "@/mission/domain/MissionListType";

export default function Missions() {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    query: { data: missions, isFetching, refetch },
    setMode,
    mode,
  } = useListMissions();

  const listTypesIcons = {
    myMissions: "account",
    favorites: "heart",
    involved: "handshake",
  } as const;

  return (
    <Container className="p-0" edges={["top"]}>
      <Text className="font-bold text-3xl m-4 b-0">{t("screen.missions")}</Text>
      <ButtonBar
        className="p-2 px-4"
        options={missionListTypes.map((type) => ({
          label: t(`mission.list.types.${type}`),
          value: type,
          icon: listTypesIcons[type],
        }))}
        selected={mode}
        onPress={setMode}
      />
      <MissionList
        onRefresh={refetch}
        missions={missions || []}
        isLoading={isFetching}
        NoResultsComponent={() => <NoResults type={mode} />}
      />
      {mode === "myMissions" && (
        <IconButton
          className="absolute bottom-4 right-4"
          variant="primary"
          size="medium"
          icon="plus"
          onPress={() => router.push("/mission/creation")}
        />
      )}
    </Container>
  );
}
