import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Container, Image } from "@/components";
import { MapPicker } from "@/maps/components/MapPicker";
import { useMissionCreationStep } from "@/mission/application/useMissionCreationStep";

import { reverseGeocode } from "@/maps/interface/mapsApi";
import { useQuery } from "react-query";

export default function MissionLocation() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { form, onNext } = useMissionCreationStep("location");
  const location = form.getValues("location");
  const error = form.formState.errors.location?.message;

  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-4">{t("mission.creation.titles.location")}</Text>
      <Image
        source={require("@/assets/images/illustration/right-direction.png")}
        className="w-full aspect-[1.6]"
        resizeMode="contain"
      />
      <Text className="font-bold text-neutral-500 my-6 text-center">
        {t("mission.creation.helper.location")}
      </Text>
      <Button
        icon="map-marker"
        variant="secondary"
        label={location?.locationName || t("mission.creation.location.pick")}
        onPress={() => setOpen((p) => !p)}
      />
      {error && <Text className="text-center mt-2 mb-auto text-xs text-red-500">{error}</Text>}
      <Button className="mt-auto" label={t("action.next")} onPress={onNext} />
      <MapPicker
        open={open}
        onClose={() => setOpen(false)}
        name="location"
        control={form.control}
      />
    </Container>
  );
}
