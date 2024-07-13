import { useTranslation } from "react-i18next";
import { Button, Container, Text, Select } from "@/components";
import { useProfilingStep } from "@/profiling/hooks/useProfilingStep";
import { profileTypeOptions } from "@/profiling/domain/ProfileType";
import { Option } from "@/components/ui/forms/Select/Select";

export default function Type() {
  const { t } = useTranslation();
  const { form, onNext } = useProfilingStep("type");

  return (
    <Container>
      <Text className="font-bold text-3xl mb-10">{t("profiling.titles.type")}</Text>
      <Select name="type" control={form.control} options={profileTypeOptions as Option[]} />
      <Button label={t("action.next")} className="mt-auto" onPress={onNext} />
    </Container>
  );
}
