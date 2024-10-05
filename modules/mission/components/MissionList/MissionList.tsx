import MissionCard from "../MissionCard/MissionCard";
import { Mission } from "@/mission/domain/Mission";
import { Container } from "@/components";
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";
import { NoResults } from "@/components/ui/feedback/NoResults";

interface MissionListProps {
  missions: Mission[];
  isLoading?: boolean;
  style?: object;
  NoResultsComponent: () => JSX.Element;
  className?: string;
  onPlanSelected?: (index: number) => void;
}

const MissionList: React.FC<MissionListProps> = ({ missions, isLoading, NoResultsComponent }) => {
  return (
    <FlatList
      className="pt-4 flex-1"
      data={missions}
      renderItem={({ item }) => <MissionCard mission={item as Mission} key={item.id} />}
      ListEmptyComponent={
        isLoading ? <ActivityIndicator animating={true} /> : <NoResultsComponent />
      }
    />
  );
};

export default MissionList;
