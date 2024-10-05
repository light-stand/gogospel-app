import { useUserStore } from "@/user/store/useUserStore";
import { missionRepository } from "../interface/missionRepository";
import { useQuery } from "react-query";
import { useState } from "react";
import { MissionListTypes } from "../domain/MissionList";
import { SupabaseFilter } from "@/interface/repository";

export const useListMissions = () => {
  const { user } = useUserStore();
  const [mode, setMode] = useState<MissionListTypes>("favorites");

  const listMissionFilters = {
    myMissions: [["created_by", "eq", user?.id]],
    favorites: [
      ["approved", "eq", true],
      ["active", "eq", true],
      ["favorite.user_id", "eq", user?.id],
    ],
    involved: [
      ["approved", "eq", true],
      ["active", "eq", true],
      ["connection.user1_id", "eq", user?.id],
    ],
  }[mode];

  const query = useQuery({
    queryKey: ["listMissions", listMissionFilters],
    queryFn: () =>
      missionRepository.get(
        listMissionFilters as SupabaseFilter | SupabaseFilter[],
        "*, user_profile!created_by(name, images), favorite!inner(*), connection(*)"
      ),
  });

  return { query, mode, setMode };
};
