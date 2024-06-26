import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export const useAuth = () => {
  const router = useRouter();

  const logout = async () => {
    await AsyncStorage.multiRemove(["token", "refresh"]);
    router.push("/onboarding/welcome");
  };

  return { logout };
};
