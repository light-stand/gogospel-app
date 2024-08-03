import { ActivityIndicator, FlatList } from "react-native";
import { useListConnections } from "../application/useListConnections";
import { useTranslation } from "react-i18next";
import { ConnectionListItem } from "./ConnectionListItem";

export const ConnectionList = () => {
  const { t } = useTranslation();
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
