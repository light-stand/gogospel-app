import { Button, Container, Text } from "@/components";
import { useProfilingStep } from "@/profiling/hooks/useProfilingStep";
import { useTranslation } from "react-i18next";

export default function Interests() {
  const { t } = useTranslation();
  const { form, onNext } = useProfilingStep("interests");
  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-10">TODO INTERESTS TITLE</Text>
      <Button label={t("action.next")} className="mt-auto" onPress={onNext} />
    </Container>
  );
}
