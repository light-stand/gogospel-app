import { Button } from "@/components/ui/actions";
import { Container } from "@/components/ui/structure";
import { useLogout } from "@/auth/application/useLogout";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import { useQuery } from "react-query";

export default function Explore() {
  const router = useRouter();
  const { data, isLoading } = useQuery("auth/v1/user");
  const { mutate: logout } = useLogout();

  return (
    <Container>
      <Text className="mt-4 text-red-500">Explore</Text>
      <Text className="mt-4 text-red-500">{((data as any) || {}).email}</Text>
      <Button onPress={logout} label={"Logout"} variant="secondary"></Button>
    </Container>
  );
}
