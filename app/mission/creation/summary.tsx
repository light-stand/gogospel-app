import { useTranslation } from "react-i18next";
import { Button, Container, Image, Text } from "@/components";

import { useMissionCreationStep } from "@/mission/application/useMissionCreationStep";
import { useUserStore } from "@/user/store/useUserStore";
import { MissionCard } from "@/mission/components/MissionCard";

export default function MissionDone() {
  const { t } = useTranslation();
  const { form, onNext } = useMissionCreationStep("summary");
  const { user } = useUserStore();
  const values = form.getValues();
  return (
    <Container>
      <Text className="font-bold text-3xl mb-4 text-center">
        {t("mission.creation.titles.summary")}
      </Text>
      <Image
        source={require("@/assets/images/illustration/celebration.png")}
        className="w-full aspect-[1.6] mt-8"
        resizeMode="contain"
      />
      <Text className="text-neutral-500 font-bold mt-2 mb-auto text-center">
        {t("mission.creation.helper.summary")}
      </Text>
      <MissionCard
        className="w-full aspect-[2.4] mb-4"
        mission={{
          id: 1,
          title: values.title,
          description: values.description,
          start_date: values.startDate,
          duration: values.duration * values.durationMultiplier,
          categories: values.categories,
          ...(values.image && { images: [values.image] }),
          ministry: user.ministry,
        }}
      />
      <Button label={t("action.done")} onPress={onNext} />
    </Container>
  );
}
