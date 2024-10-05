import { useMemo } from "react";
import clsx from "clsx";
import { ActivityIndicator, Alert, View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/components";
import { Mission } from "@/mission/domain/Mission";
import { useUserStore } from "@/user/store/useUserStore";
import { useAuthModal } from "@/auth/context/AuthModalContext";
import { useFavoriteActions } from "@/mission/application/useFavoriteActions";
import { checkIsFavorite } from "@/mission/utils/checkIsFavorite";

interface MissionSheetActionsProps {
  mission: Mission;
}

export const MissionSheetActions = ({ mission }: MissionSheetActionsProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useUserStore();
  const { openModal } = useAuthModal();
  const { addFavorite, removeFavorite, isLoading } = useFavoriteActions();

  const isFavorite = useMemo(() => checkIsFavorite(mission, user?.id), [mission, user?.id]);

  const toggleFavorite = () => {
    if (!user?.id) return openModal();
    isFavorite ? removeFavorite(id) : addFavorite(id);
  };

  const onJoin = () => {
    if (!user?.id) return openModal();
    router.push(`/connections/request/${id}`);
  };

  const { id } = mission;

  return (
    <View className="w-full gap-y-2">
      <View className="flex-row gap-x-2">
        <Button
          className={clsx(
            "flex-1 border-2 border-rose-500",
            isFavorite ? "bg-rose-500" : "bg-white",
            isFavorite ? "text-white" : "text-rose-500"
          )}
          icon={isLoading ? null : isFavorite ? "heart" : "heart-outline"}
          label={isLoading ? <ActivityIndicator /> : t("mission.actions.favorite")}
          onPress={toggleFavorite}
        />
        <Button
          className="flex-1 bg-green-500 opacity-50"
          icon="currency-usd"
          variant="success"
          label={t("mission.actions.give")}
          onPress={() => Alert.alert(t("alerts.comingSoon.title"), t("alerts.comingSoon.text"))}
        />
      </View>
      <Button label={t("mission.actions.join")} onPress={onJoin} icon="handshake" />
    </View>
  );
};
