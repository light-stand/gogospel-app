import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { MissionCreationFields, missionCreationSchema } from "@/mission/domain/MissionCreationForm";
import { useAuthStore } from "@/auth/store/useAuthStore";
import { useUserStore } from "@/user/store/useUserStore";
import { Mission } from "../domain/Mission";
import { missionRepository } from "../interface/missionRepository";

export const useMissionCreation = () => {
  const router = useRouter();
  const { user } = useUserStore();

  const form = useForm<MissionCreationFields>({
    resolver: zodResolver(missionCreationSchema),
    mode: "onBlur",
    defaultValues: {
      durationUnit: 1,
    },
  });

  const { getValues } = form;

  const onSuccess = (data: Mission) => {
    router.push("/mission/creation");
  };

  const { mutate: createMission } = useMutation(missionRepository.create, { onSuccess });

  const onSubmit = () => {
    const values = getValues();
    createMission({
      ministry_id: user.ministry?.id,
      title: values.title,
      description: values.description,
      categories: values.categories,
      images: [values.picture],
      location: `gis.st_point(${values.location.latitude}, ${values.location.longitude})`,
    });
  };

  return { form, onSubmit };
};
