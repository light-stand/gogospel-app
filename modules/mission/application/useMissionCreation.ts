import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { MissionCreationFields, missionCreationSchema } from "@/mission/domain/MissionCreationForm";
import { useUserStore } from "@/user/store/useUserStore";
import { missionRepository } from "../interface/missionRepository";

export const useMissionCreation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  const form = useForm<MissionCreationFields>({
    resolver: zodResolver(missionCreationSchema),
    mode: "onBlur",
    defaultValues: { durationMultiplier: 7, duration: 1 },
  });

  const { getValues } = form;

  const onSuccess = () => {
    queryClient.invalidateQueries(["listMissions", "myMissions"]);
    router.push("/(main)/missions");
  };

  const { mutate: createMission } = useMutation(missionRepository.create, { onSuccess });

  const onSubmit = () => {
    const values = getValues();
    createMission({
      created_by: user?.id,
      title: values.title,
      description: values.description,
      start_date: values.startDate,
      duration: values.duration * values.durationMultiplier,
      categories: values.categories,
      location: `POINT(${values.location.longitude} ${values.location.latitude})`,
      location_name: values.location.locationName,
      ...(values.image && { images: [values.image] }),
    });
  };

  return { form, onSubmit };
};
