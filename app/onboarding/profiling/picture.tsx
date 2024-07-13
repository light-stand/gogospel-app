import { useTranslation } from "react-i18next";
import { Container, ImagePicker, Text, Button } from "@/components";
import { useProfilingStep } from "@/profiling/hooks/useProfilingStep";

export default function Picture() {
  const { t } = useTranslation();
  const { form, onNext } = useProfilingStep("picture");
  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-10">{t("profiling.titles.image")}</Text>
      <ImagePicker icon="camera" name="picture" control={form?.control} />
      <Button label={t("action.next")} className="mt-auto" onPress={onNext} />
    </Container>
  );
}
