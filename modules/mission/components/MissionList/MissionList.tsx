import MissionCard from "../MissionCard/MissionCard";
import { Mission } from "@/mission/domain/Mission";
import { Container } from "@/components";
import { View } from "react-native";

interface MissionListProps {
  missions: Mission[];
  style?: object;
  className?: string;
  onPlanSelected?: (index: number) => void;
}

const MissionList: React.FC<MissionListProps> = ({ missions, style }) => {
  if (missions.length === 0) return;

  return (
    <Container scroll className="bg-neutral-100 pt-8">
      <View className="h-16"></View>
      {missions.map((item) => (
        <MissionCard className="mb-2" mission={item as Mission} key={item.id} />
      ))}
    </Container>
  );
};

export default MissionList;
