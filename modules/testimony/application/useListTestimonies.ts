import { useState } from "react";
import { useQuery } from "react-query";

import { useUserStore } from "@/user/store/useUserStore";
import { testimonyRepository } from "../interface/testimonyRepository";
import { SupabaseFilter } from "@/interface/repository";
import { ListTestimonyModes } from "../domain/Testimony";

export const useListTestimonies = (userId?: string) => {
  const { user } = useUserStore();
  const [mode, setMode] = useState<ListTestimonyModes>("received");

  const listTestimonyFilters =
    mode === "received" ? ["target_user_id", "eq", userId] : ["user_id", "eq", user?.id];

  const select = [
    "*",
    "user:user_profile!testimony_user_id_fkey(name, images)",
    "target_user:user_profile!testimony_target_user_id_fkey(name, images)",
    "mission(title)",
  ].join(",");

  return {
    query: useQuery({
      queryKey: ["listTestimonies", listTestimonyFilters],
      queryFn: () =>
        testimonyRepository.get(listTestimonyFilters as SupabaseFilter | SupabaseFilter[], select),
    }),
    mode,
    setMode,
  };
};
