import { useMemo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Container, Input, TagCloud, Text } from "@/components";
import { useProfilingStep } from "@/profiling/hooks/useProfilingStep";
import { ministryTypes } from "@/user/domain/MinistryType";

export default function Name() {
  const { form, onNext } = useProfilingStep("name");
  const { t } = useTranslation();

  const ministryTypesOptions = useMemo(
    () =>
      Object.entries(ministryTypes).map(([key, value]) => ({
        ...value,
        value: key,
        label: t(`ministry.types.${key}`),
      })),
    [t]
  );

  return (
    <Container scroll>
      <Text className="font-bold text-3xl mb-10">{t(`profiling.titles.name`)}</Text>
      <View>
        <Input label={t(`profiling.fields.name.label`)} name="name" control={form.control} />
        {/* TODO: Investigate the need of a last nam */}
        {/* <Input
          className="mt-2"
          label={t(`profiling.fields.lastName.${flowType}`)}
          name="lastName"
          control={form.control}
        /> */}
        <TagCloud
          className="my-4"
          label={t(`profiling.fields.ministryType.label`)}
          name="ministryType"
          max={1}
          options={ministryTypesOptions}
          control={form.control}
        />
      </View>
      <Button label={t("action.next")} className="mt-auto" onPress={onNext} />
    </Container>
  );
}
