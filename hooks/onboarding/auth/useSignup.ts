import { useRouter } from "expo-router";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { password } from "@/utils/regex";
import { useMutation } from "@/hooks";
import { AxiosError } from "axios";

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().regex(password, {
      message:
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter and one number",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFields = z.infer<typeof schema>;

type AuthResponse = {
  access_token: string;
  refresh_token: string;
};

type AuthErrorResponse = {
  msg: string;
};

export const useSignup = () => {
  const router = useRouter();

  const form = useForm<SignupFields>({
    resolver: zodResolver(schema),
  });

  const onSignupSuccess = async (data: AuthResponse) => {
    AsyncStorage.multiSet([
      ["token", data.access_token],
      ["refresh", data.refresh_token],
    ]);
    router.push("/(main)");
  };

  const { mutate: signup, error } = useMutation<
    AuthResponse,
    AxiosError<AuthErrorResponse>,
    SignupFields
  >("auth/v1/signup", { onSuccess: onSignupSuccess });

  const onSubmit: SubmitHandler<SignupFields> = (data) => signup(data);

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    error: error?.response?.data.msg,
  };
};
