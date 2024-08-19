import { useQuery } from "react-query";

import { missionRepository } from "@/mission/interface/missionRepository";
import { useUserStore } from "@/user/store/useUserStore";

export const useMissionDetails = (id: number) => {
  const { user } = useUserStore();
  const { data: mission, isLoading } = useQuery({
    queryKey: ["mission", id],
    queryFn: () =>
      missionRepository.getById(id, "*, ministry(id, name, images), favorite(missionary_id)"),
  });

  // Thanks to RLS, "favorite" should contain only the user entry
  const isFavorite = mission?.favorite?.some((fav) => fav.missionary_id === user?.missionary?.id);

  return { mission, isLoading, isFavorite };
};
