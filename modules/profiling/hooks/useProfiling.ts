import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfilingFields, profilingSchema } from "@/profiling/domain/ProfilingForm";
import { useAuthStore } from "@/auth/store/useAuthStore";
import { useUserStore } from "@/user/store/useUserStore";
import { MissionType } from "@/mission/domain/MissionType";
import { MinistryType } from "@/ministry/domain/MinistryType";
import { userProfileRepository } from "@/user/interface/userProfileRepository";
import { UserProfile } from "@/user/domain/User";

export const useProfiling = () => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const { session } = useAuthStore();
  const form = useForm<ProfilingFields>({
    resolver: zodResolver(profilingSchema),
    mode: "onBlur",
  });

  const { getValues } = form;

  const onSuccess = (data: UserProfile) => {
    setUser({ profile: data as UserProfile });
    // router.push("/mission/creation");
    router.push("/(main)");
  };

  const { mutate: createProfile } = useMutation(userProfileRepository.create, {
    onSuccess,
  });

  const onSubmit = () => {
    const values = getValues();
    createProfile({
      user_id: session?.user.id as string,
      name: values.name,
      description: values.bio,
      images: [values.picture],
      verified: false,
      type: (values.ministryType as MinistryType[])[0],
    });
  };

  return { form, onSubmit };
};
