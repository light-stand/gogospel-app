import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function Connection() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView>
      <Text>Connection</Text>
    </ScrollView>
  );
}
