import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { signup } from "../infrastructure/authApi";
import { AuthResponse } from "../domain/AuthResponse";
import { SignupErrorResponse, SignupFields } from "../domain/Signup";
import { useUserContext } from "@/user/context/UserContext";

export const useSignup = () => {
  const router = useRouter();
  const { setUser } = useUserContext();

  const onSuccess = async (data: AuthResponse) => {
    await AsyncStorage.multiSet([
      ["token", data.access_token],
      ["refresh", data.refresh_token],
    ]);
    setUser({ id: data.sub, types: [] });
    router.push("/onboarding/profiling/type");
  };

  const signUpMutation = useMutation<
    AuthResponse,
    AxiosError<SignupErrorResponse>,
    SignupFields
  >(signup, { onSuccess });

  return signUpMutation;
};
