import { useUserStore } from "@/user/store/useUserStore";
import { missionRepository } from "../interface/missionRepository";
import { useQuery } from "react-query";
import { useState } from "react";
import { MissionListTypes } from "../domain/MissionListType";
import { SupabaseFilter } from "@/interface/repository";

export const useListMissions = () => {
  const { user } = useUserStore();
  const [mode, setMode] = useState<MissionListTypes>("myMissions");

  const listMissionFilters = {
    myMissions: ["created_by", "eq", user?.id],
    favorites: ["favorite.user_id", "eq", user?.id],
    involved: [
      ["approved", "eq", true],
      ["active", "eq", true],
      ["connection.user1_id", "eq", user?.id],
    ],
  }[mode];

  const select = `*, user_profile!created_by(name, images),${
    mode === "involved" ? "connection!inner(*)" : "connection(*)"
  }, ${mode === "favorites" ? "favorite!inner(*)" : "favorite(*)"}`;

  const query = useQuery({
    queryKey: ["listMissions", listMissionFilters, select],
    queryFn: () =>
      missionRepository.get(listMissionFilters as SupabaseFilter | SupabaseFilter[], select),
  });

  return { query, mode, setMode };
};
