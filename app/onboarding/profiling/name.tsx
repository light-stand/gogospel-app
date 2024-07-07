import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Container, Input, Text } from "@/components";
import { useProfilingScreen } from "@/profiling/hooks/useProfilingScreen";

export default function Name() {
  const { t } = useTranslation();
  const { form, onNext } = useProfilingScreen("name");
  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-10">
        {t("profiling.titles.name")}
      </Text>
      <View className="gap-y-2">
        <Input
          label={t("profiling.fields.firstName")}
          name="firstName"
          control={form.control}
        />
        <Input
          label={t("profiling.fields.lastName")}
          name="lastName"
          control={form.control}
        />
      </View>
      <Button label={t("action.next")} className="mt-auto" onPress={onNext} />
    </Container>
  );
}
