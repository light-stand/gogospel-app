import { useMemo } from "react";
import { ScrollView } from "react-native";
import { useTranslation } from "react-i18next";

import { Button, Container, Text, TagCloud } from "@/components";
import { useMissionCreationStep } from "@/mission/application/useMissionCreationStep";
import { missionTypes, missionTypesWithLocale } from "@/mission/domain/MissionType";

export default function MissionCategory() {
  const { t } = useTranslation();
  const { form, onNext } = useMissionCreationStep("category");

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
      <Text className="font-bold text-3xl mb-4">{t("mission.creation.titles.categories")}</Text>
      <Text className="font-bold text-neutral-500 mb-4">
        {t("mission.creation.helper.categories")}
      </Text>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <TagCloud name="categories" control={form.control} options={options} />
      </ScrollView>
      <Button className="mt-auto" label={t("action.next")} onPress={onNext} />
    </Container>
  );
}
