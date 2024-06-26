import { Button, Container } from "@/components";
import { useRouter } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function Welcome() {
  const router = useRouter();
  return (
    <Container>
      <Button
        label={"Sign Up"}
        variant="success"
        onPress={() => router.push("/onboarding/auth/signup")}
      />
      <Button
        label={"Login"}
        onPress={() => router.push("/onboarding/auth/login")}
      />
    </Container>
  );
}
