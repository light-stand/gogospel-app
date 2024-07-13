import { useMutation } from "react-query";
import { useRouter } from "expo-router";
import { signup } from "../infrastructure/authApi";

export const useSignup = () => {
  const router = useRouter();

  const onSuccess = async () => {
    router.push("/onboarding/profiling/type");
  };

  const loginMutation = useMutation(signup, { onSuccess });

  return loginMutation;
};
