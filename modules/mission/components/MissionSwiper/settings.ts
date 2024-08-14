import { Dimensions } from "react-native";

const PAGE_WIDTH = Dimensions.get("window").width;

export const missionCardSwiperSettings = {
  vertical: false,
  width: PAGE_WIDTH,
  height: 148,
  loop: false,
  autoplay: false,
  enableSnap: true,
  enableMomentum: true,
  swipeThreshold: 50,
  modeConfig: {
    parallaxScrollingScale: 0.9,
    parallaxScrollingOffset: 50,
  },
};
