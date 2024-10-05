import { ActivityIndicator, FlatList } from "react-native";
import { useListConnections } from "../application/useListConnections";
import { ConnectionListItem } from "./ConnectionListItem";
import { NoResults } from "@/components/ui/feedback";

export const ConnectionList = () => {
  const { data: connections, isFetching, refetch } = useListConnections();

  return (
    <FlatList
      refreshing={isFetching}
      data={connections}
      onRefresh={refetch}
      renderItem={({ item }) => <ConnectionListItem connection={item} />}
      ListEmptyComponent={isFetching ? <ActivityIndicator /> : <NoResults type="connections" />}
    />
  );
};
