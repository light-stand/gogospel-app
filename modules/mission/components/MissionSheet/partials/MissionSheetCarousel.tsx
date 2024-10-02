import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Image } from "@/components";
import { Mission } from "@/mission/domain/Mission";

type MissionSheetCarouselProps = {
  mission: Mission;
};

// const width = Dimensions.get("window").width - 32;
const width = Dimensions.get("window").width;

export const MissionSheetCarousel = ({ mission }: MissionSheetCarouselProps) => {
  const { images, user_profile } = mission;
  return (
    <Carousel
      data={(images && images.length ? images : user_profile?.images[0]) as string[]}
      width={width}
      height={width / 2}
      style={{ marginLeft: -16 }}
      // style={{ borderRadius: 16 }}
      renderItem={({ index, item }) => (
        <Image className="h-full" key={index} source={{ uri: item }} />
      )}
    />
  );
};
