import { Button, Text, Container } from "@/components";
import { useLogout } from "@/auth/application/useLogout";
import { useRouter } from "expo-router";
import { useUserStore } from "@/user/store/useUserStore";

export default function MyProfile() {
  const router = useRouter();
  const { user } = useUserStore();
  const { mutate: logout } = useLogout();

  return (
    <Container>
      <Text className="mt-4 text-red-500">Explore</Text>
      <Button onPress={logout} label={"Logout"} variant="secondary"></Button>
      <Button
        onPress={() => router.push("/onboarding/profiling/type")}
        label={"Onboarding"}
        variant="primary"
      />
      <Text className="mt-4 text-slate-500">{JSON.stringify(user)}</Text>
    </Container>
  );
}
