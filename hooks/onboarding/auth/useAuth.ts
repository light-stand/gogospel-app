import { useAppContext } from "@/context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useQuery } from "react-query";

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  sub: string;
};

export const useAuth = () => {
  const router = useRouter();
  const { setUser } = useAppContext();

  const logout = async () => {
    await AsyncStorage.multiRemove(["token", "refresh"]);
    router.push("/onboarding/welcome");
  };

  const onAuth = async (data: AuthResponse, route: string) => {
    await AsyncStorage.multiSet([
      ["token", data.access_token],
      ["refresh", data.refresh_token],
    ]);
    setUser({ token: data.access_token, id: data.sub, types: [] });
    router.push(route);
  };

  return { logout, onAuth };
};
