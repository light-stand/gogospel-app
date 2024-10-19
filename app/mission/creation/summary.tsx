import { useEffect, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Container, Image, Text } from "@/components";

import { useMissionCreationStep } from "@/mission/application/useMissionCreationStep";
import { useUserProfile } from "@/user/application/useUserProfile";
import { MissionSheetTitle } from "@/mission/components/MissionSheet/partials/MissionSheetTitle";
import { MissionSheetCarousel } from "@/mission/components/MissionSheet/partials/MissionSheetCarousel";
import { MissionSheetInfo } from "@/mission/components/MissionSheet/partials/MissionSheetInfo";
import { Mission } from "@/mission/domain/Mission";
import { getLocation } from "@/maps/interface/mapsService";
import { haversineDistance } from "@/maps/utils/distance";

export default function MissionDone() {
  const { t } = useTranslation();
  const { form, onNext } = useMissionCreationStep("summary");
  const [distance, setDistance] = useState(0);
  const profile = useUserProfile();
  const {
    title,
    description,
    startDate,
    duration,
    durationMultiplier,
    noDuration,
    noStartDate,
    categories,
    image,
    location,
  } = form.getValues();

  const getMissionDistance = async (lat: number, long: number) => {
    const userLocation = await getLocation();
    if (!userLocation || !lat || !long) return 0;
    setDistance(haversineDistance(userLocation?.latitude, userLocation?.longitude, lat, long));
  };

  useEffect(() => {
    getMissionDistance(location.latitude, location.longitude);
  }, [location]);

  const mission: Mission = {
    id: 1,
    title,
    description,
    start_date: noStartDate ? null : startDate,
    duration: noDuration || !duration ? null : duration * durationMultiplier,
    categories,
    created_by: profile.user_id,
    ...(image && { images: [image] }),
    user_profile: profile,
    location_name: location.locationName,
    distance: Math.floor(distance),
  };

  return (
    <Container showBack scroll className="pb-8">
      <Text className="font-bold text-3xl mb-4 text-center">
        {t("mission.creation.titles.summary")}
      </Text>
      <Image
        source={require("@/assets/images/illustration/celebration.png")}
        className="w-full aspect-[1.6] mt-6"
        resizeMode="contain"
      />
      <Text className="text-neutral-500 font-bold my-2 text-center">
        {t("mission.creation.helper.summary")}
      </Text>
      <View className="h-[1px]  border-b border-neutral-300 my-4" />
      <MissionSheetTitle mission={mission} position={2} />
      <MissionSheetCarousel mission={mission} />
      <MissionSheetInfo mission={mission} />
      <Button className="mt-12 mb-8" label={t("action.done")} onPress={onNext} />
    </Container>
  );
}
