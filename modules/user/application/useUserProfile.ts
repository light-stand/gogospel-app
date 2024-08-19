import { useEffect } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { useLocalSearchParams } from "expo-router";

import { ministryRepository } from "@/ministry/interface/ministryRepository";
import { missionaryRepository } from "@/missionary/interface/missionaryRepository";
import { UserType } from "@/profiling/domain/Profiling";
import { useUserStore } from "@/user/store/useUserStore";

export const useUserProfile = () => {
  const { type } = useLocalSearchParams();
  const id = parseInt(useLocalSearchParams().id as string);
  const { user } = useUserStore();

  const { data: ministry } = useQuery({
    queryKey: ["ministry", id],
    queryFn: () => ministryRepository.getById(id),
    enabled: type === "ministry",
  });

  const { data: missionary } = useQuery({
    queryKey: ["missionary", id],
    queryFn: () => missionaryRepository.getById(id),
    enabled: type === "missionary",
  });

  const isOwn = id === user?.ministry?.id || id === user?.missionary?.id;

  const data = {
    missionary: {
      images: missionary?.images || [],
      name: [missionary?.first_name, missionary?.last_name].filter(Boolean).join(" "),
      created_at: missionary?.created_at,
      description: missionary?.bio,
      verified: false,
      interests: missionary?.interests || [],
    },
    ministry: {
      images: ministry?.images || [],
      name: ministry?.name || "",
      created_at: ministry?.created_at,
      description: ministry?.description,
      verified: ministry?.verified,
      interests: [],
    },
  }[type as UserType];

  const { images } = data;

  const userProfileForm = useForm({
    defaultValues: {
      image: images[0],
    },
  });

  const { setValue } = userProfileForm;

  useEffect(() => {
    setValue("image", images[0]);
  }, [images]);

  return { form: userProfileForm, profileData: data, isOwn, userType: type as UserType };
};
