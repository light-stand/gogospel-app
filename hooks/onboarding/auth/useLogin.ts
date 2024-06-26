import { useRouter } from "expo-router";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useMutation } from "@/hooks";
import { AxiosError } from "axios";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginFields = z.infer<typeof schema>;

type AuthResponse = {
  access_token: string;
  refresh_token: string;
};

type AuthErrorResponse = {
  error_description: string;
};

export const useLogin = () => {
  const router = useRouter();

  const form = useForm<LoginFields>({
    resolver: zodResolver(schema),
  });

  const onLoginSuccess = async (data: AuthResponse) => {
    AsyncStorage.multiSet([
      ["token", data.access_token],
      ["refresh", data.refresh_token],
    ]);
    router.push("/(main)");
  };

  const { mutate: login, error } = useMutation<
    AuthResponse,
    AxiosError<AuthErrorResponse>,
    LoginFields
  >("auth/v1/token?grant_type=password", {
    onSuccess: onLoginSuccess,
  });

  const onSubmit: SubmitHandler<LoginFields> = (data) => login(data);

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    error: error?.response?.data.error_description,
  };
};
