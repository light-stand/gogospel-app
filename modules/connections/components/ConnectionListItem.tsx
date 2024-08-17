import { Alert, TouchableOpacity, View } from "react-native";
import { Connection, ConnectionStatus } from "../domain/Connection";
import { UserPhoto } from "@/components/ui/structure/UserPhoto";
import { Icon, IconButton, Text } from "@/components";
import { useUserStore } from "@/user/store/useUserStore";
import { UserType } from "@/profiling/domain/Profiling";
import { useRouter } from "expo-router";
import { useManageSubmission } from "../application/useManageSubmission";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export const ConnectionListItem = ({ connection }: { connection: Connection }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useUserStore();
  const { id, mission, ministry, missionary, status, messages } = connection;
  const { onSubmissionManage } = useManageSubmission(id);

  const data = {
    image: user.type === UserType.Missionary ? ministry?.images[0] : missionary?.images[0],
    user: user.type === UserType.Missionary ? ministry?.name : missionary?.first_name,
    title: mission?.title,
    lastMessage: messages && messages[0] && messages[0].text,
  };

  const isPending = user.type === UserType.Missionary && status === ConnectionStatus.Pending;
  const canManage = user.type === UserType.Ministry && status === ConnectionStatus.Pending;
  const canRestore = user.type === UserType.Ministry && status === ConnectionStatus.Rejected;

  const onItemPress = () => {
    if (isPending) return Alert.alert(t("connections.submission.errors.notAccepted"));
    router.push(`/connections/${id}`);
  };

  return (
    <TouchableOpacity onPress={onItemPress}>
      <View className="border-b border-neutral-300 py-3 px-4 flex-row items-center">
        <UserPhoto
          source={{ uri: data.image }}
          className={clsx("h-12 w-12 mr-3", status === ConnectionStatus.Rejected && "opacity-50")}
        />
        <View className={clsx("flex-1", status === ConnectionStatus.Rejected && "opacity-50")}>
          <Text className={"font-bold text-base"}>{data.user}</Text>
          <Text className="text-neutral-400 font-bold mb-[2px]">{data.title}</Text>
          <Text numberOfLines={1}>{data.lastMessage}</Text>
        </View>
        {isPending && <Icon name="clock-outline" className="ml-auto text-3xl text-neutral-400" />}
        {canManage && (
          <>
            <IconButton
              icon="close"
              className="text-red-400 ml-auto"
              onPress={onSubmissionManage(ConnectionStatus.Rejected)}
            />
            <IconButton
              icon="check"
              className="text-green-400 ml-2"
              onPress={onSubmissionManage(ConnectionStatus.Accepted)}
            />
          </>
        )}
        {canRestore && (
          <IconButton
            icon="undo"
            className="text-yellow-400 ml-auto"
            onPress={onSubmissionManage(ConnectionStatus.Pending)}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
