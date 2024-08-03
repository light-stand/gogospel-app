import { useQuery } from "react-query";
import { connectionRepository } from "../interface/connectionRepository";
import { useUserStore } from "@/user/store/useUserStore";
import { UserType } from "@/profiling/domain/Profiling";

export const useListConnections = () => {
  const { user } = useUserStore();
  const query =
    user.type === UserType.Missionary
      ? { missionary_id: user?.missionary?.id }
      : { ministry_id: user?.ministry?.id };

  return useQuery({
    queryKey: ["connections", query],
    queryFn: () => connectionRepository.get(query, "*, missionary(*), ministry(*), mission(*)"),
  });
};
