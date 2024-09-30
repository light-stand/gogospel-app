import { useUserStore } from "@/user/store/useUserStore";
import { missionRepository } from "../interface/missionRepository";
import { useQuery } from "react-query";

export const useFavoriteMissions = () => {
  const { user } = useUserStore();
  return useQuery({
    queryKey: ["favoriteMissions"],
    queryFn: () =>
      missionRepository.get(
        [
          ["approved", "eq", true],
          ["active", "eq", true],
          ["favorite.user_id", "eq", user?.id],
        ],
        "*, user_profile!created_by(name, images), favorite!inner(*)"
      ),
  });
};
