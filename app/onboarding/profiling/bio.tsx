import { useTranslation } from "react-i18next";
import { Button, Container, Input, Text } from "@/components";
import { useProfilingScreen } from "@/profiling/hooks/useProfilingScreen";

export default function Bio() {
  const { t } = useTranslation();
  const { form, onNext } = useProfilingScreen("bio");
  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-10">
        {t("profiling.titles.bio")}
      </Text>
      <Input
        label={t("profiling.fields.bio")}
        name="bio"
        type="textarea"
        className="min-h-32"
        control={form.control}
      />
      <Button label={t("action.next")} className="mt-auto" onPress={onNext} />
    </Container>
  );
}
