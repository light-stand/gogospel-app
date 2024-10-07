import { useEffect } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { useLocalSearchParams } from "expo-router";

import { useUserStore } from "@/user/store/useUserStore";
import { userProfileRepository } from "../interface/userProfileRepository";

export const useUserProfile = () => {
  const id = useLocalSearchParams().id as string;
  const { user } = useUserStore();

  const { data: profiles } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => userProfileRepository.get(["user_id", "eq", id]),
  });

  const profile = profiles?.[0];

  const isOwn = id === user?.id;

  const data = {
    images: profile?.images || [],
    name: profile?.name || "",
    created_at: profile?.created_at,
    description: profile?.description,
    is_verified: profile?.is_verified,
    interests: [],
  };

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

  return { form: userProfileForm, profileData: data, isOwn };
};
