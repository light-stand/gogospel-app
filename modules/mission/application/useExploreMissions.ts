import { useState } from "react";
import { useQuery } from "react-query";
import { missionRepository } from "../interface/missionRepository";
import { MissionViewInput } from "../domain/Mission";

export const useExploreMissions = () => {
  const [focused, setFocused] = useState(0);
  const [filters, setFilters] = useState({});

  const { data: missions } = useQuery({
    queryKey: ["missions", filters],
    queryFn: () => missionRepository.get({}),
  });

  return { focused, setFocused, missions, filters };
};
