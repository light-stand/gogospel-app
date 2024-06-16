import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function MissionRequest() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView>
      <Text>MissionRequest</Text>
    </ScrollView>
  );
}
