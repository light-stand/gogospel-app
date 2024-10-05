import { useTranslation } from "react-i18next";
import { Button, Container, Icon, IconButton, Text } from "@/components";
import { useListMissions } from "@/mission/application/useListMissions";
import { MissionList } from "@/mission/components/MissionList";
import { View } from "react-native";
import { NoResults } from "@/components/ui/feedback/NoResults";
import { missionListTypes } from "@/mission/domain/MissionListType";
import { Link } from "expo-router";

export default function Missions() {
  const { t } = useTranslation();
  const {
    query: { data: missions, isFetching },
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
            className="text-xs flex-1 py-1"
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
        missions={missions || []}
        isLoading={isFetching}
        NoResultsComponent={() => <NoResults type={mode} />}
      />
      {mode === "myMissions" && (
        <Link href="/mission/creation" asChild>
          <IconButton
            className="absolute bottom-4 right-4"
            variant="primary"
            size="medium"
            icon="plus"
          />
        </Link>
      )}
    </Container>
  );
}
