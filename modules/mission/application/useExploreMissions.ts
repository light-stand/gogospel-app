import { useState } from "react";
import { useQuery } from "react-query";
import { missionRepository } from "../interface/missionRepository";
import { MissionViewInput } from "../domain/Mission";
import { useForm } from "react-hook-form";
import { ExploreFilters, exploreFiltersSchema } from "../domain/ExploreFilters";
import { zodResolver } from "@hookform/resolvers/zod";

export const defaultFilters: ExploreFilters = {
  interests: [],
  ministryType: [],
  distance: 0,
};

export const useExploreMissions = () => {
  const [focused, setFocused] = useState(0);
  const filters = useForm<ExploreFilters>({
    resolver: zodResolver(exploreFiltersSchema),
    defaultValues: defaultFilters,
  });

  const { data: missions } = useQuery({
    queryKey: ["missions", filters.getValues()],
    queryFn: () => missionRepository.get([], "*, ministry(name, images)"),
  });

  return { focused, setFocused, missions, filters };
};
