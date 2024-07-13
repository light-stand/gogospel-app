import { useTranslation } from "react-i18next";
import { Button, Container, Input, Text } from "@/components";
import { useProfilingStep } from "@/profiling/hooks/useProfilingStep";

export default function Bio() {
  const { t } = useTranslation();
  const { form, onNext, flowType } = useProfilingStep("bio");
  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-10">{t(`profiling.titles.bio.${flowType}`)}</Text>
      <Input
        label={t(`profiling.fields.bio.${flowType}`)}
        name="bio"
        type="textarea"
        className="min-h-32"
        control={form.control}
      />
      <Button label={t("action.next")} className="mt-auto" onPress={onNext} />
    </Container>
  );
}
