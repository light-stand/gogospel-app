import { Button } from "@/components/ui/actions";
import { Container } from "@/components/ui/structure";
import { ScrollView, Text } from "react-native";

export default function Explore() {
  return (
    <Container>
      <Text className="mt-4 text-red-500">Explore</Text>
      <Button label={"Explore"}></Button>
    </Container>
  );
}
