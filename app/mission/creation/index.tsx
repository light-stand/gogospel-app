import { useTranslation } from "react-i18next";
import { Button, Container, Image, Text } from "@/components";
import { useMissionCreationStep } from "@/mission/application/useMissionCreationStep";
import { useUserStore } from "@/user/store/useUserStore";

export default function MissionCreation() {
  const { t } = useTranslation();
  const { form, onNext } = useMissionCreationStep("index");
  const { user } = useUserStore();
  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-4 text-center">
        {t("mission.creation.titles.start")}
      </Text>
      <Image
        source={require("@/assets/images/illustration/launching.png")}
        className="w-full aspect-[1.6] mt-8"
        resizeMode="contain"
      />
      <Text className="text-neutral-500 font-bold mt-2 mb-auto text-center">
        {t("mission.creation.helper.start", { ministry: user.profile?.name })}
      </Text>
      <Button label={t("action.next")} onPress={onNext} />
    </Container>
  );
}
