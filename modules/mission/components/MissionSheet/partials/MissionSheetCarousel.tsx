import { Dimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Image } from "@/components";
import { Mission } from "@/mission/domain/Mission";

type MissionSheetCarouselProps = {
  mission: Mission;
};

const width = Dimensions.get("window").width;

export const MissionSheetCarousel = ({ mission }: MissionSheetCarouselProps) => {
  const { images, user_profile } = mission;
  return (
    <View className="w-full" style={{ height: width / 2 }}>
      <Carousel
        data={(images && images.length ? images : user_profile?.images) as string[]}
        width={width}
        height={width / 2}
        style={{ marginLeft: -16, maxHeight: width / 2 }}
        renderItem={({ index, item }) => (
          <Image className="h-full" key={index} source={{ uri: item }} />
        )}
      />
    </View>
  );
};
