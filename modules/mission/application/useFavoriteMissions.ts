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
          ["favorite.missionary_id", "eq", user?.missionary?.id],
        ],
        "*, ministry(name, images), favorite!inner(*)"
      ),
  });
};
