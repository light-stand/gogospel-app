import { TouchableOpacity, View } from "react-native";
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
        "*, missionary(id, images, first_name), ministry(id, images, name), mission(title)"
      ),
  });

  if (!connection) return null;

  const { mission, ministry, missionary, status } = connection;

  const data = {
    missionary: {
      id: ministry?.id,
      type: UserType.Ministry,
      image: ministry?.images[0],
      user: ministry?.name,
      title: mission?.title,
    },
    ministry: {
      id: missionary?.id,
      type: UserType.Missionary,
      image: missionary?.images[0],
      user: missionary?.first_name,
      title: mission?.title,
    },
  }[user.type as UserType];

  return (
    <View className="flex-row items-center h-14">
      <IconButton icon="chevron-left" onPress={router.back} size="medium" className="p-0 mr-2" />
      <UserPhoto
        source={{ uri: data.image }}
        className={clsx("h-10 w-10 mr-3", status === ConnectionStatus.Rejected && "opacity-50")}
        onPress={() => router.push(`/profile/${data.type}/${data.id}`)}
      />
      <TouchableOpacity onPress={() => router.push(`/profile/${data.type}/${data.id}`)}>
        <View className={clsx(status === ConnectionStatus.Rejected && "opacity-50")}>
          <Text className={"font-bold text-base"}>{data.user}</Text>
          <Text className="text-neutral-400 font-bold mb-[2px]">{data.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
