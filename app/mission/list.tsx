import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function MissionList() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView>
      <Text>MissionList</Text>
    </ScrollView>
  );
}
