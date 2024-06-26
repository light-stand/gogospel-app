import { AxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@/hooks";
import { AuthResponse, useAuth } from "./useAuth";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginFields = z.infer<typeof schema>;

type AuthErrorResponse = {
  error_description: string;
};

export const useLogin = () => {
  const form = useForm<LoginFields>({
    resolver: zodResolver(schema),
  });

  const { onAuth } = useAuth();

  const { mutate: login, error } = useMutation<
    AuthResponse,
    AxiosError<AuthErrorResponse>,
    LoginFields
  >("auth/v1/token?grant_type=password", {
    onSuccess: (data) => onAuth(data, "/(main)"),
  });

  const onSubmit: SubmitHandler<LoginFields> = (data) => login(data);

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    error: error?.response?.data.error_description,
  };
};
