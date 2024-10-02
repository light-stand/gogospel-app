import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/components";
import { Mission } from "@/mission/domain/Mission";
import { useUserStore } from "@/user/store/useUserStore";
import { useAuthModal } from "@/auth/context/AuthModalContext";

interface MissionSheetActionsProps {
  mission: Mission;
}

export const MissionSheetActions = ({ mission }: MissionSheetActionsProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useUserStore();
  const { openModal } = useAuthModal();
  const { id } = mission;

  const onJoin = () => {
    if (!user?.id) return openModal();
    router.push(`/connections/request/${id}`);
  };

  return (
    <View className="w-full">
      <Button label={t("mission.actions.join")} onPress={onJoin} />
    </View>
  );
};
