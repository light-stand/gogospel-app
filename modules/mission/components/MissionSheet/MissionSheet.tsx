import React, { useCallback, useRef, useState } from "react";
import { Dimensions, View, ViewStyle } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { IconButton } from "@/components";
import { Mission } from "@/mission/domain/Mission";
import { MissionSheetTitle } from "./partials/MissionSheetTitle";
import { MissionSheetCarousel } from "./partials/MissionSheetCarousel";
import { MissionSheetInfo } from "./partials/MissionSheetInfo";
import { MissionSheetActions } from "./partials/MissionSheetActions";
import { useUserStore } from "@/user/store/useUserStore";

interface MissionSheetProps {
  mission: Mission;
  className?: string;
  style?: ViewStyle;
}

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const SNAP_POINTS = [96, 96 + WIDTH / 2, HEIGHT];

const MissionSheet: React.FC<MissionSheetProps> = ({ mission, style }) => {
  const { top } = useSafeAreaInsets();
  const { user } = useUserStore();
  const [position, setPosition] = useState(0);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetAnimates = useCallback((curr: number) => setPosition(curr), []);

  if (!mission) return;

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={SNAP_POINTS}
        containerStyle={{ zIndex: 20 }}
        topInset={top}
        onChange={handleSheetAnimates}
        handleIndicatorStyle={position === 2 && { backgroundColor: "transparent" }}
        // handleStyle={{ height: 4 }}
        style={style}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={2}
            disappearsOnIndex={1}
            opacity={1}
            style={[props.style, { backgroundColor: "white" }]}
          />
        )}
      >
        <BottomSheetScrollView
          className="flex-1 items-center"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {position >= 2 && (
            <Animated.View entering={FadeIn} exiting={FadeOut} className="absolute right-4 z-10">
              <IconButton
                size="small"
                icon="close"
                className="text-neutral-600 bg-[#FFFFFF99]"
                onPress={() => bottomSheetRef.current?.snapToIndex(1)}
              />
            </Animated.View>
          )}
          <View className="flex-col flex-1 items-start justify-start px-4">
            <MissionSheetTitle mission={mission} position={position} />
            <MissionSheetCarousel mission={mission} />
            <MissionSheetInfo mission={mission} />
            {mission.created_by !== user.id && <MissionSheetActions mission={mission} />}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

export default MissionSheet;
