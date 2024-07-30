import { useTranslation } from "react-i18next";
import { Container, ImagePicker, Text, Button } from "@/components";
import { useMissionCreationStep } from "@/mission/application/useMissionCreationStep";

export default function MissionImage() {
  const { t } = useTranslation();
  const { form, onNext } = useMissionCreationStep("image");
  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-4">{t("profiling.titles.image")}</Text>
      <Text className="font-bold text-neutral-500 mb-4">{t("mission.creation.helper.image")}</Text>
      <ImagePicker icon="camera" name="image" control={form.control} />
      <Button label={t("action.later")} className="mt-auto" variant="secondary" onPress={onNext} />
      <Button label={t("action.next")} className="mt-2" onPress={onNext} />
    </Container>
  );
}
