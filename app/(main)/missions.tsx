import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

import { Button, Container, IconButton, Text } from "@/components";
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
    <Container className="p-0">
      <Text className="font-bold text-3xl m-4 mb-0">{t("screen.missions")}</Text>
      <View className="flex-row justify-around w-full gap-2 p-2">
        {missionListTypes.map((type) => (
          <Button
            key={type}
            className="text-xs flex-1 py-1 px-1"
            label={t(`mission.list.types.${type}`)}
            size="small"
            icon={listTypesIcons[type]}
            variant={mode === type ? "primary" : "text"}
            onPress={() => setMode(type)}
            block={false}
          />
        ))}
      </View>
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
