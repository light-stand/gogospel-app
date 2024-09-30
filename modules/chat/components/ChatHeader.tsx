import { TouchableOpacity, View } from "react-native";
import clsx from "clsx";
import { useRouter } from "expo-router";

import { IconButton, Text } from "@/components";
import { UserPhoto } from "@/components/ui/structure/UserPhoto";
import { ConnectionStatus } from "@/connections/domain/Connection";
import { useUserStore } from "@/user/store/useUserStore";
import { useQuery } from "react-query";
import { connectionRepository } from "@/connections/interface/connectionRepository";
import { UserProfile } from "@/user/domain/User";

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
        "*, user1:user_profile!user1_id(images, name), user2:user_profile!user2_id(images, name), mission(title)"
      ),
  });

  if (!connection) return null;

  const { user1_id, user1, user2, status, mission } = connection;

  const data = (user.id === user1_id ? user2 : user1) as UserProfile;

  return (
    <View className="flex-row items-center h-14">
      <IconButton icon="chevron-left" onPress={router.back} size="medium" className="p-0 mr-2" />
      <UserPhoto
        source={{ uri: data.images[0] }}
        className={clsx("h-10 w-10 mr-3", status === ConnectionStatus.Rejected && "opacity-50")}
        onPress={() => router.push(`/profile/${data.id}`)}
      />
      <TouchableOpacity onPress={() => router.push(`/profile/${data.user_id}`)}>
        <View className={clsx(status === ConnectionStatus.Rejected && "opacity-50")}>
          <Text className={"font-bold text-base"}>{data.name}</Text>
          <Text className="text-neutral-400 font-bold mb-[2px]">{mission?.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
