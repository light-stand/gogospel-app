import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Button, Container, Input, Text, Picker, DatePicker } from "@/components";
import { useMissionCreationStep } from "@/mission/application/useMissionCreationStep";

export default function MissionDuration() {
  const { t } = useTranslation();
  const { form, onNext } = useMissionCreationStep("details");

  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-4">{t("mission.creation.titles.duration")}</Text>
      <DatePicker
        name="startDate"
        control={form.control}
        label={t("mission.creation.fields.startDate")}
        className="mb-2"
      />
      <View className="flex flex-row gap-x-2">
        <Input
          name="duration"
          control={form.control}
          label={t("mission.creation.fields.duration")}
          className="flex-[1.5]"
          inputMode="numeric"
        />
        {/* <Input name="durationUnit" control={form.control} label=" " className="flex-1" /> */}
        <Picker
          name="durationUnit"
          label=" "
          items={[
            { label: t("mission.creation.duration.days"), value: 1 },
            { label: t("mission.creation.duration.weeks"), value: 7 },
            { label: t("mission.creation.duration.months"), value: 30 },
          ]}
          control={form.control}
          className="flex-1"
        />
      </View>
      <Button className="mt-auto" label={t("action.next")} onPress={onNext} />
    </Container>
  );
}
