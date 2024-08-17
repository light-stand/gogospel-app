import { useMutation, useQueryClient } from "react-query";
import { connectionRepository } from "../interface/connectionRepository";
import { useUserStore } from "@/user/store/useUserStore";
import { UserType } from "@/profiling/domain/Profiling";
import { Alert } from "react-native";
import { Mission } from "@/mission/domain/Mission";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { SupabaseError } from "@/interface/supabase";
import { sendMessage } from "@/chat/interface/chatApi";

export const useSendSubmission = (mission?: Mission) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const onSuccess = () => {
    router.push("(main)/connections");
  };

  const onError = (error: any) => {
    const key = error.code === SupabaseError.Duplicated ? "alreadySent" : "unknown";
    Alert.alert(t(`connections.submission.errors.${key}`));
  };

  const { mutateAsync: sendMessageMutation } = useMutation({
    mutationKey: "sendMessage",
    mutationFn: sendMessage,
  });

  const { mutateAsync: createConnection } = useMutation({
    mutationKey: "sendSubmission",
    mutationFn: connectionRepository.create,
    onSuccess,
    onError,
  });
  const { user } = useUserStore();

  const sendSubmission = async ({ message }: { message: string }) => {
    if (!mission) return Alert.alert(t("mission.errors.notFound"));
    if (user.type !== UserType.Missionary) return Alert.alert(t("error.notMissionary"));

    const connection = await createConnection({
      mission_id: mission.id,
      missionary_id: user.missionary?.id as number,
      ministry_id: mission.ministry?.id as number,
    });

    await sendMessageMutation({
      user_id: user.id as string,
      connection_id: connection.id,
      text: message,
      created_at: new Date(),
    });

    queryClient.invalidateQueries(["connections"]);
  };

  return { sendSubmission };
};
