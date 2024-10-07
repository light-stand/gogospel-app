import { View } from "react-native";
import { Text } from "@/components";

const ClusterMarker = ({ count }: { count: number }) => (
  <View className="bg-stone-500 p-[12px] rounded-full aspect-square items-center">
    <Text className="text-white font-bold">{count}</Text>
  </View>
);

export default ClusterMarker;
