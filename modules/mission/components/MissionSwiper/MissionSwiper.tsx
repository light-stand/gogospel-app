import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { missionCardSwiperSettings } from "./settings";
import { MissionCard } from "../MissionCard";
import { Mission } from "@/mission/domain/Mission";

interface MissionCardSwiperProps {
  missions: Mission[];
  focusedEvent: number;
  style?: object;
  className?: string;
  onPlanSelected?: (index: number) => void;
}

const MissionCardSwiper: React.FC<MissionCardSwiperProps> = ({
  missions,
  focusedEvent,
  onPlanSelected,
  style,
}) => {
  const carouselRef = useRef<ICarouselInstance>(null);

  useEffect(() => {
    if (missions.length === 0) return;
    const carousel = carouselRef.current as ICarouselInstance;
    if (carousel && carouselRef.current?.getCurrentIndex() !== focusedEvent)
      carousel.scrollTo({ index: focusedEvent, animated: true });
  }, [focusedEvent]);

  if (missions.length === 0) return;
  return (
    <View style={style}>
      <Carousel
        {...missionCardSwiperSettings}
        ref={carouselRef}
        onSnapToItem={onPlanSelected}
        data={missions}
        mode="parallax"
        renderItem={({ index, item }) => (
          <MissionCard className="h-full w-full max-w-full" mission={item as Mission} />
        )}
      />
    </View>
  );
};

export default MissionCardSwiper;
