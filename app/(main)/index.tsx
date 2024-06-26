import { Button } from "@/components/ui/actions";
import { Container } from "@/components/ui/structure";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import { useQuery } from "react-query";

export default function Explore() {
  const router = useRouter();
  const { data, isLoading } = useQuery("auth/v1/user");

  return (
    <Container>
      <Text className="mt-4 text-red-500">Explore</Text>
      <Text className="mt-4 text-red-500">{(data as any).email}</Text>
      <Button
        label={"Sign Up"}
        onPress={() => router.push("/onboarding/auth/signup")}
      ></Button>
      <Button
        onPress={() => console.log(123)}
        label={"Explore"}
        variant="secondary"
      ></Button>
    </Container>
  );
}
