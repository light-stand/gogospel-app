import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function Profile() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView>
      <Text>Profile</Text>
    </ScrollView>
  );
}
