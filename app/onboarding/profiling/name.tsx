import { useMemo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Container, Input, TagCloud, Text } from "@/components";
import { useProfilingStep } from "@/profiling/hooks/useProfilingStep";
import { UserType } from "@/profiling/domain/Profiling";
import { ministryTypes } from "@/ministry/domain/MinistryType";

export default function Name() {
  const { form, flowType, onNext } = useProfilingStep("name");
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
    <Container showBack scroll={flowType === UserType.Ministry}>
      <Text className="font-bold text-3xl mb-10">{t(`profiling.titles.name.${flowType}`)}</Text>
      <View>
        <Input
          label={t(`profiling.fields.firstName.${flowType}`)}
          name="firstName"
          control={form.control}
        />
        {flowType === UserType.Missionary && (
          <Input
            className="mt-2"
            label={t(`profiling.fields.lastName.${flowType}`)}
            name="lastName"
            control={form.control}
          />
        )}
        {flowType === UserType.Ministry && (
          <TagCloud
            className="my-4"
            label={t(`profiling.fields.ministryType.${flowType}`)}
            name="ministryType"
            max={1}
            options={ministryTypesOptions}
            control={form.control}
          />
        )}
      </View>
      <Button label={t("action.next")} className="mt-auto" onPress={onNext} />
    </Container>
  );
}
