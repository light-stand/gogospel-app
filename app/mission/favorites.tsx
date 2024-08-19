import { Container, Text } from "@/components";
import { useFavoriteMissions } from "@/mission/application/useFavoriteMissions";
import { MissionList } from "@/mission/components/MissionList";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";

export default function UserFavoriteMissions() {
  const { t } = useTranslation();
  const { data: missions } = useFavoriteMissions();

  return (
    <Container className="p-0 bg-neutral-100" showBack>
      <Text className="font-bold text-3xl px-4">{t("user.profile.favorites")}</Text>
      <MissionList missions={missions || []} />
    </Container>
  );
}
