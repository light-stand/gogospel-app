import { useTranslation } from "react-i18next";
import { Button, Container, Input, Text } from "@/components";
import { useMissionCreationStep } from "@/mission/application/useMissionCreationStep";

export default function MissionTitle() {
  const { t } = useTranslation();
  const { form, onNext } = useMissionCreationStep("details");

  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-4">{t("mission.creation.titles.title")}</Text>
      <Input
        name="title"
        control={form.control}
        label={t("mission.creation.fields.title")}
        placeholder={t("mission.creation.placeholder.title")}
        className="mb-4"
      />
      <Input
        name="description"
        control={form.control}
        label={t("mission.creation.fields.description")}
        placeholder={t("mission.creation.placeholder.description")}
        type="textarea"
      />
      <Button className="mt-auto" label={t("action.next")} onPress={onNext} />
    </Container>
  );
}
