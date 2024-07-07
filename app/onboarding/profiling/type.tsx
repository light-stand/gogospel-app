import { useTranslation } from "react-i18next";
import { Button, Container, Text, Select } from "@/components";
import { useProfilingScreen } from "@/profiling/hooks/useProfilingScreen";
import { profileTypeOptions } from "@/profiling/domain/ProfileType";
import { Option } from "@/components/ui/forms/Select/Select";

export default function Type() {
  const { t } = useTranslation();
  const { form, onNext } = useProfilingScreen("type");

  const options = profileTypeOptions.map((option) => ({
    ...option,
    title: t(option.title),
    description: t(option.description),
  }));

  return (
    <Container>
      <Text className="font-bold text-3xl mb-10">
        {t("profiling.titles.type")}
      </Text>
      <Select
        name="type"
        control={form.control}
        options={options as Option[]}
      />
      <Button label={t("action.next")} className="mt-auto" onPress={onNext} />
    </Container>
  );
}
