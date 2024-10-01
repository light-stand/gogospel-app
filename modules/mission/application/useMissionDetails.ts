import { useQuery } from "react-query";

import { missionRepository } from "@/mission/interface/missionRepository";
import { useUserStore } from "@/user/store/useUserStore";

export const useMissionDetails = (id: number) => {
  const { user } = useUserStore();
  const { data: mission, isLoading } = useQuery({
    queryKey: ["mission", id],
    queryFn: () =>
      missionRepository.getById(
        id,
        "*, user_profile!created_by(user_id, name, images), favorite(user_id)"
      ),
  });

  // Thanks to RLS, "favorite" should contain only the user entry
  const isFavorite =
    Array.isArray(mission?.favorite) && mission.favorite.some((fav) => fav.user_id === user?.id);

  return { mission, isLoading, isFavorite };
};
