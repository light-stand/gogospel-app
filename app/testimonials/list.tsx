import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function TestimonialList() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView>
      <Text>TestimonialList</Text>
    </ScrollView>
  );
}
