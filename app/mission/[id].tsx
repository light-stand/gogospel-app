import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function MissionPage() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView>
      <Text>MissionPage</Text>
    </ScrollView>
  );
}
