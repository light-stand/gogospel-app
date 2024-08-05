import { View } from "react-native";
import clsx from "clsx";
import { useRouter } from "expo-router";

import { IconButton, Text } from "@/components";
import { UserPhoto } from "@/components/ui/structure/UserPhoto";
import { ConnectionStatus } from "@/connections/domain/Connection";
import { UserType } from "@/profiling/domain/Profiling";
import { useUserStore } from "@/user/store/useUserStore";
import { useQuery } from "react-query";
import { connectionRepository } from "@/connections/interface/connectionRepository";

type ChatHeaderProps = {
  id: number;
};

export const ChatHeader = ({ id }: ChatHeaderProps) => {
  const router = useRouter();
  const { user } = useUserStore();
  const { data: connection } = useQuery({
    queryKey: ["connection", id],
    queryFn: () =>
      connectionRepository.getById(
        id,
        "*, missionary(images, first_name), ministry(images, name), mission(title)"
      ),
  });

  if (!connection) return null;

  const { mission, ministry, missionary, status } = connection;

  const data = {
    image: user.type === UserType.Missionary ? ministry?.images[0] : missionary?.images[0],
    user: user.type === UserType.Missionary ? ministry?.name : missionary?.first_name,
    title: mission?.title,
  };

  return (
    <View className="flex-row items-center h-14">
      <IconButton icon="chevron-left" onPress={router.back} size="medium" className="p-0 mr-2" />
      <UserPhoto
        source={{ uri: data.image }}
        className={clsx("h-10 w-10 mr-3", status === ConnectionStatus.Rejected && "opacity-50")}
      />
      <View className={clsx(status === ConnectionStatus.Rejected && "opacity-50")}>
        <Text className={"font-bold text-base"}>{data.user}</Text>
        <Text className="text-neutral-400 font-bold mb-[2px]">{data.title}</Text>
      </View>
    </View>
  );
};
