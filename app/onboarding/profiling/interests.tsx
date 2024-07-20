import { useMemo } from "react";
import { ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Container, TagCloud, Text } from "@/components";
import { missionTypes } from "@/mission/domain/MissionType";
import { useProfilingStep } from "@/profiling/hooks/useProfilingStep";

export default function Interests() {
  const { t } = useTranslation();
  const { form, onNext } = useProfilingStep("interests");

  const options = useMemo(
    () =>
      Object.entries(missionTypes).map(([key, value]) => ({
        ...value,
        value: key,
        label: t(`mission.types.${key}`),
      })),
    [t]
  );

  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-4">{t("profiling.titles.interests")}</Text>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <TagCloud name="interests" control={form.control} options={options} />
      </ScrollView>
      <Button label={t("action.next")} className="mt-4" onPress={onNext} />
    </Container>
  );
}
