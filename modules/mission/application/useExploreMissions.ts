import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { missionRepository } from "../interface/missionRepository";
import { MissionViewInput } from "../domain/Mission";
import { useForm } from "react-hook-form";
import { ExploreFilters, exploreFiltersSchema } from "../domain/ExploreFilters";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLocation } from "@/maps/interface/mapsService";

export const defaultFilters: ExploreFilters = {
  interests: [],
  ministryType: [],
  distance: 0,
};

export const useExploreMissions = () => {
  const [focused, setFocused] = useState(0);
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  const filters = useForm<ExploreFilters>({
    resolver: zodResolver(exploreFiltersSchema),
    defaultValues: defaultFilters,
  });

  useEffect(() => {
    getLocation().then((location) => {
      location &&
        setLocation({
          lat: location.latitude,
          long: location.longitude,
        });
    });
  }, []);

  const filterValues = filters.getValues();

  const { data: missions } = useQuery({
    queryKey: ["missions", filterValues],
    queryFn: () => missionRepository.exploreMissions({ ...filterValues, ...location }),
  });

  return { focused, setFocused, missions, filters };
};
