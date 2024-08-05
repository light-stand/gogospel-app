import { FlatList } from "react-native";
import { useListConnections } from "../application/useListConnections";
import { ConnectionListItem } from "./ConnectionListItem";

export const ConnectionList = () => {
  const { data: connections, isLoading, refetch } = useListConnections();

  return (
    <FlatList
      refreshing={isLoading}
      data={connections}
      onRefresh={refetch}
      renderItem={({ item }) => <ConnectionListItem connection={item} />}
    />
  );
};
