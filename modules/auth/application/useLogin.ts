import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { login } from "../infrastructure/authApi";
import { AuthResponse } from "../domain/AuthResponse";
import { LoginErrorResponse, LoginFields } from "../domain/Login";
import { useUserContext } from "@/user/context/UserContext";

export const useLogin = () => {
  const router = useRouter();
  const { setUser } = useUserContext();

  const onSuccess = async (data: AuthResponse) => {
    await AsyncStorage.multiSet([
      ["token", data.access_token],
      ["refresh", data.refresh_token],
    ]);
    setUser({ id: data.sub, types: [] });
    router.push("/(main)");
  };

  const loginMutation = useMutation<
    AuthResponse,
    AxiosError<LoginErrorResponse>,
    LoginFields
  >(login, { onSuccess });

  return loginMutation;
};
