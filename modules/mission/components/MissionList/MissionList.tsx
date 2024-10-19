import { ActivityIndicator, FlatList, FlatListProps } from "react-native";

import MissionCard from "../MissionCard/MissionCard";
import { Mission } from "@/mission/domain/Mission";

interface MissionListProps extends Omit<FlatListProps<Mission>, "data" | "renderItem"> {
  missions: Mission[];
  isLoading?: boolean;
  NoResultsComponent?: () => JSX.Element;
  onPlanSelected?: (index: number) => void;
}

const MissionList: React.FC<MissionListProps> = ({
  missions,
  isLoading,
  NoResultsComponent,
  ...props
}) => {
  return (
    <FlatList
      refreshing={isLoading}
      contentContainerStyle={{ paddingBottom: 32 }}
      data={missions}
      renderItem={({ item }) => <MissionCard mission={item as Mission} key={item.id} />}
      ListEmptyComponent={
        isLoading ? (
          <ActivityIndicator animating={true} />
        ) : NoResultsComponent ? (
          <NoResultsComponent />
        ) : null
      }
      {...props}
    />
  );
};

export default MissionList;
