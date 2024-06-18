import { Button } from "@/components/ui/actions";
import { Container } from "@/components/ui/structure";
import { ScrollView, Text } from "react-native";

export default function Explore() {
  return (
    <Container>
      <Text className="mt-4 text-red-500">Explore</Text>
      <Button onPress={() => console.log(123)} label={"Explore"}></Button>
      <Button
        onPress={() => console.log(123)}
        label={"Explore"}
        variant="secondary"
      ></Button>
    </Container>
  );
}
