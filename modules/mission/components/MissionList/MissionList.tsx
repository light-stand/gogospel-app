import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import MissionCard from "../MissionCard/MissionCard";
import { Mission } from "@/mission/domain/Mission";
import { Container } from "@/components";

interface MissionListProps {
  missions: Mission[];
  style?: object;
  className?: string;
  onPlanSelected?: (index: number) => void;
}

const MissionList: React.FC<MissionListProps> = ({ missions, style }) => {
  if (missions.length === 0) return;

  return (
    <Container scroll className="bg-neutral-200 pt-8">
      {missions.map((item) => (
        <MissionCard className="mb-2" mission={item as Mission} key={item.id} />
      ))}
    </Container>
  );
};

export default MissionList;
