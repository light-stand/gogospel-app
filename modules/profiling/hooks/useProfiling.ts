import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfilingFields, profilingSchema } from "@/profiling/domain/ProfilingForm";
import { missionaryRepository } from "@/missionary/interface/missionaryRepository";
import { ministryRepository } from "@/ministry/interface/ministryRepository";
import { UserType } from "../domain/Profiling";
import { Missionary } from "@/missionary/domain/Missionary";
import { Ministry } from "@/ministry/domain/Ministry";
import { useAuthStore } from "@/auth/store/useAuthStore";
import { useUserStore } from "@/user/store/useUserStore";
import { MissionType } from "@/mission/domain/MissionType";
import { MinistryType } from "@/ministry/domain/MinistryType";

export const useProfiling = () => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const { session } = useAuthStore();
  const form = useForm<ProfilingFields>({
    resolver: zodResolver(profilingSchema),
    mode: "onBlur",
  });

  const { getValues } = form;

  const onSuccess = (userType: UserType) => (data: Missionary | Ministry) => {
    if (userType === UserType.Ministry) {
      setUser({ ministry: data as Ministry });
      router.push("/mission/creation");
    } else {
      setUser({ missionary: data as Missionary });
      router.push("/(main)");
    }
  };

  const { mutate: createMinistry } = useMutation(ministryRepository.create, {
    onSuccess: onSuccess(UserType.Ministry),
  });

  const { mutate: createMissionary } = useMutation(missionaryRepository.create, {
    onSuccess: onSuccess(UserType.Missionary),
  });

  const onSubmit = () => {
    const values = getValues();
    if (getValues("type") === UserType.Ministry) {
      createMinistry({
        user_id: session?.user.id as string,
        name: values.firstName,
        description: values.bio,
        images: [values.picture],
        verified: false,
        type: (values.ministryType as MinistryType[])[0],
      });
    } else {
      createMissionary({
        user_id: session?.user.id as string,
        first_name: values.firstName,
        last_name: values.lastName as string,
        bio: values.bio,
        images: [values.picture],
        interests: values.interests as MissionType[],
      });
    }
  };

  return { form, onSubmit };
};
