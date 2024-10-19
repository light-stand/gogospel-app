import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Button, Container, Input, Text, Picker, DatePicker, Switch } from "@/components";
import { useMissionCreationStep } from "@/mission/application/useMissionCreationStep";

export default function MissionDuration() {
  const { t } = useTranslation();
  const { form, onNext } = useMissionCreationStep("duration");
  const { noDuration, noStartDate } = form.getValues();
  form.watch(["noDuration", "noStartDate", "startDate"]);

  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-4">{t("mission.creation.titles.duration")}</Text>
      <Text className="font-bold text-neutral-500 mb-4">
        {t("mission.creation.helper.duration")}
      </Text>
      <DatePicker
        name="startDate"
        control={form.control}
        disabled={noStartDate}
        label={t("mission.creation.fields.startDate")}
      />
      <Switch
        className="my-4"
        name="noStartDate"
        control={form.control}
        label={t("mission.creation.fields.noStartDate")}
      />
      <View className="flex flex-row gap-x-2">
        <Input
          name="duration"
          control={form.control}
          label={t("mission.creation.fields.duration")}
          className="flex-1"
          inputMode="numeric"
          keyboardType="numeric"
          maxLength={2}
          disabled={noDuration}
        />
        <Picker
          name="durationMultiplier"
          label=" "
          items={[
            { label: t("mission.creation.duration.days"), value: 1 },
            { label: t("mission.creation.duration.weeks"), value: 7 },
            { label: t("mission.creation.duration.months"), value: 30 },
          ]}
          control={form.control}
          className="flex-1"
          disabled={noDuration}
        />
      </View>
      <Switch
        className="mt-4"
        name="noDuration"
        control={form.control}
        label={t("mission.creation.fields.noDuration")}
      />
      <Button className="mt-auto" label={t("action.next")} onPress={onNext} />
    </Container>
  );
}
