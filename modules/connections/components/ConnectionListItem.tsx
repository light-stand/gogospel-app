import { TouchableOpacity, View } from "react-native";
import { Connection } from "../domain/Connection";
import { UserPhoto } from "@/components/ui/structure/UserPhoto";
import { Text } from "@/components";
import { useUserStore } from "@/user/store/useUserStore";
import { UserType } from "@/profiling/domain/Profiling";
import { useRouter } from "expo-router";

export const ConnectionListItem = ({ connection }: { connection: Connection }) => {
  const router = useRouter();
  const { user } = useUserStore();
  const { id, mission, ministry, missionary } = connection;

  const data = {
    image: user.type === UserType.Missionary ? ministry?.images[0] : missionary?.images[0],
    user: user.type === UserType.Missionary ? ministry?.name : missionary?.first_name,
    title: mission?.title,
    lastMessage: "Lorem ipsum", // TODO: Get last message
  };

  return (
    <TouchableOpacity onPress={() => router.push(`/connections/${id}`)}>
      <View key={id} className="border-b border-neutral-300 p-3 flex-row items-center">
        <UserPhoto source={{ uri: data.image }} className="h-12 w-12 mr-3" />
        <View>
          <Text className="font-bold text-base">{data.user}</Text>
          <Text className="text-neutral-400 font-bold mb-[2px]">{data.title}</Text>
          <Text className="">{data.lastMessage}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
