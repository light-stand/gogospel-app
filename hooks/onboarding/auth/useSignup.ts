import { AxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { password } from "@/utils/regex";
import { useMutation } from "@/hooks";
import { AuthResponse, useAuth } from "./useAuth";

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

type AuthErrorResponse = {
  msg: string;
};

export const useSignup = () => {
  const form = useForm<SignupFields>({
    resolver: zodResolver(schema),
  });

  const { onAuth } = useAuth();

  const { mutate: signup, error } = useMutation<
    AuthResponse,
    AxiosError<AuthErrorResponse>,
    SignupFields
  >("auth/v1/signup", {
    onSuccess: (data) => onAuth(data, "/onboarding/profiling/type"),
  });

  const onSubmit: SubmitHandler<SignupFields> = (data) => signup(data);

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    error: error?.response?.data.msg,
  };
};
