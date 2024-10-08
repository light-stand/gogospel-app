import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { MissionCreationFields, missionCreationSchema } from "@/mission/domain/MissionCreationForm";
import { useUserStore } from "@/user/store/useUserStore";
import { missionRepository } from "../interface/missionRepository";
import { useMissionDetails } from "./useMissionDetails";
import { queryClient } from "@/interface/queryClient";
import { parseDuration } from "../utils/parser";

export const useMissionEdit = () => {
  const id = parseInt(useLocalSearchParams().id as string);
  const router = useRouter();
  const { user } = useUserStore();
  const { mission } = useMissionDetails(id);

  const form = useForm<MissionCreationFields>({
    resolver: zodResolver(missionCreationSchema),
    mode: "onChange",
    defaultValues: mission && {
      ...mission,
      duration: parseDuration(mission.duration)[0],
      image: mission.images ? mission.images[0] : "",
      startDate: new Date(mission.start_date || 0),
      durationMultiplier: parseDuration(mission.duration)[1],
      location: {
        latitude: mission.lat || 0,
        longitude: mission.long || 0,
        locationName: mission.location_name || "",
      },
    },
  });

  const onSuccess = () => {
    queryClient.invalidateQueries(["mission", id]);
    router.push("/missions");
    form.reset();
  };

  const { mutateAsync: updateMission, isLoading } = useMutation(missionRepository.update, {
    onSuccess,
  });

  const onSubmit = async () => {
    const { trigger, getValues } = form;
    const valid = await trigger();
    if (valid) {
      const mission = getValues();
      updateMission({
        id,
        created_by: user?.id,
        title: mission.title,
        description: mission.description,
        start_date: mission.startDate,
        duration: mission.duration * mission.durationMultiplier,
        categories: mission.categories,
        location: `POINT(${mission.location.longitude} ${mission.location.latitude})`,
        location_name: mission.location.locationName,
        ...(mission.image && { images: [mission.image] }),
      });
    }
  };

  return { form, onSubmit, isLoading };
};
