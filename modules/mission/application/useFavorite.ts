import { useMutation, useQueryClient } from "react-query";
import { addFavorite, removeFavorite } from "../interface/favoriteApi";
import { useUserStore } from "@/user/store/useUserStore";
import { Favorite } from "../domain/Favorite";
import { Mission } from "../domain/Mission";
import { Updater } from "react-query/types/core/utils";

export const useFavorite = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const onSuccess = (action: "add" | "remove") => (fav: Favorite) => {
    queryClient.setQueryData(["mission", fav.mission_id], (data: Updater<any, any>) => ({
      ...data,
      favorite:
        action === "add"
          ? [...(data?.favorite || []), fav]
          : data?.favorite?.filter((f: Favorite) => f.missionary_id !== user?.missionary?.id),
    }));
  };

  const addFavoriteMutation = useMutation({
    mutationFn: (missionId: number) =>
      addFavorite({ missionary_id: user?.missionary?.id as number, mission_id: missionId }),
    onSuccess: onSuccess("add"),
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (missionId: number) =>
      removeFavorite({ missionary_id: user?.missionary?.id as number, mission_id: missionId }),
    onSuccess: onSuccess("remove"),
  });

  const isLoading = addFavoriteMutation.isLoading || removeFavoriteMutation.isLoading;

  return {
    isLoading,
    addFavorite: addFavoriteMutation.mutate,
    removeFavorite: removeFavoriteMutation.mutate,
  };
};
