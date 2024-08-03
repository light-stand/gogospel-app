import { useMutation } from "react-query";
import { connectionRepository } from "../interface/connectionRepository";
import { useUserStore } from "@/user/store/useUserStore";
import { UserType } from "@/profiling/domain/Profiling";
import { Alert } from "react-native";
import { Mission } from "@/mission/domain/Mission";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { queryClient } from "@/interface/queryClient";
import { SupabaseError } from "@/interface/supabase";
import { ConnectionStatus } from "../domain/Connection";

export const useManageSubmission = (connectionId: number) => {
  const { t } = useTranslation();

  const onSuccess = () => {
    queryClient.invalidateQueries(["connections"]);
  };

  const onError = (error: any) => {
    const key = error.code === SupabaseError.Duplicated ? "alreadySent" : "unknown";
    Alert.alert(t(`connections.submission.errors.${key}`));
  };

  const { mutate: updateSubmission } = useMutation({
    mutationKey: "updateSubmission",
    mutationFn: connectionRepository.update,
    onSuccess,
    onError,
  });
  const { user } = useUserStore();

  const manageSubmission = async (status: ConnectionStatus) => {
    if (!connectionId) return Alert.alert(t("mission.errors.notFound"));
    if (user.type !== UserType.Ministry) return Alert.alert(t("error.notMinistry"));

    updateSubmission({
      id: connectionId,
      status,
    });

    //TODO send message
  };

  const onSubmissionManage = (status: ConnectionStatus) => () => {
    Alert.alert(
      t(`connections.submission.manage.popup.title.${status}`),
      t(`connections.submission.manage.popup.text.${status}`),
      [
        { text: t("action.cancel"), style: "cancel" },
        { text: t("action.next"), onPress: () => manageSubmission(status) },
      ]
    );
  };

  return { onSubmissionManage };
};
