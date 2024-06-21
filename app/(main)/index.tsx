import { Button } from "@/components/ui/actions";
import { Container } from "@/components/ui/structure";
import { Text } from "react-native";
import { useQuery } from "react-query";

export default function Explore() {
  const { isLoading, error, data } = useQuery<any>(
    "/repos/light-stand/gogospel-app"
  );

  if (isLoading) return <Text>Loading</Text>;

  if (error) return <Text>"An error has occurred: " + error.message</Text>;

  return (
    <Container>
      <Text>{data.full_name}</Text>
      <Text>{data.description}</Text>
      <Text className="mt-4 text-red-500">Explore</Text>
      <Button label={"Explore"}></Button>
      <Button
        onPress={() => console.log(123)}
        label={"Explore"}
        variant="secondary"
      ></Button>
    </Container>
  );
}
