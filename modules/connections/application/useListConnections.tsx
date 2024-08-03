import { useQuery } from "react-query";
import { connectionRepository } from "../interface/connectionRepository";
import { useUserStore } from "@/user/store/useUserStore";
import { UserType } from "@/profiling/domain/Profiling";
import { ConnectionStatus } from "../domain/Connection";
import { SupabaseFilter } from "@/interface/repository";

export const useListConnections = () => {
  const { user } = useUserStore();
  const query: SupabaseFilter[] =
    user.type === UserType.Missionary
      ? [
          ["missionary_id", "eq", user?.missionary?.id],
          ["status", "neq", ConnectionStatus.Rejected],
        ]
      : [["ministry_id", "eq", user?.ministry?.id]];

  return useQuery({
    queryKey: ["connections", query],
    queryFn: () => connectionRepository.get(query, "*, missionary(*), ministry(*), mission(*)"),
  });
};
