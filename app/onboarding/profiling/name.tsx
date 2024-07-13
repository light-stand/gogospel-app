import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Container, Input, Text } from "@/components";
import { useProfilingScreen } from "@/profiling/hooks/useProfilingScreen";
import { UserType } from "@/profiling/domain/Profiling";

export default function Name() {
  const { form, flowType, onNext } = useProfilingScreen("name");
  const { t } = useTranslation();
  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-10">{t(`profiling.titles.name.${flowType}`)}</Text>
      <View className="gap-y-2">
        <Input
          label={t(`profiling.fields.firstName.${flowType}`)}
          name="firstName"
          control={form.control}
        />
        {flowType === UserType.Missionary && (
          <Input
            label={t(`profiling.fields.lastName.${flowType}`)}
            name="lastName"
            control={form.control}
          />
        )}
      </View>
      <Button label={t("action.next")} className="mt-auto" onPress={onNext} />
    </Container>
  );
}
