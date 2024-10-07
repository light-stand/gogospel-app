import { useMemo, useState } from "react";
import { View } from "react-native";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

import {
  Button,
  Collapsable,
  Container,
  DatePicker,
  ImagePicker,
  Input,
  Picker,
  Spinner,
  TagCloud,
  Text,
} from "@/components";
import { useMissionEdit } from "@/mission/application/useMissionEdit";
import { missionTypes } from "@/mission/domain/MissionType";
import { reverseGeocode } from "@/maps/interface/mapsApi";
import { MapPicker } from "@/maps/components/MapPicker";

export default function MissionEdit() {
  const { t } = useTranslation();
  const [mapOpen, setMapOpen] = useState(false);

  const { form, onSubmit, isLoading } = useMissionEdit();

  const location = form.getValues("location");

  const { data: address } = useQuery({
    queryKey: ["geocode", location?.latitude, location?.longitude],
    queryFn: () => reverseGeocode(location),
  });

  const types = useMemo(
    () =>
      Object.entries(missionTypes).map(([key, value]) => ({
        ...value,
        value: key,
        label: t(`mission.types.${key}`),
      })),
    [t]
  );

  return (
    <Container showBack scroll className="pb-12">
      <Text className="font-bold text-3xl mb-6">{t("mission.edit.title")}</Text>

      <ImagePicker icon="camera" name="image" control={form.control} />
      <Input
        name="title"
        control={form.control}
        label={t("mission.creation.fields.title")}
        placeholder={t("mission.creation.placeholder.title")}
        className="my-4"
      />
      <Input
        name="description"
        control={form.control}
        label={t("mission.creation.fields.description")}
        placeholder={t("mission.creation.placeholder.description")}
        type="textarea"
      />
      <View className="h-[1px] bg-neutral-300 w-[80%] my-8 mx-auto" />
      <Text className="font-bold text-neutral-500 mb-2">
        {t("mission.creation.helper.duration")}
      </Text>
      <DatePicker
        name="startDate"
        control={form.control}
        label={t("mission.creation.fields.startDate")}
        className="mb-2"
      />
      <View className="flex flex-row gap-x-2">
        <Input
          name="duration"
          control={form.control}
          label={t("mission.creation.fields.duration")}
          className="flex-[1.5]"
          inputMode="numeric"
          keyboardType="numeric"
          maxLength={2}
        />
        <Picker
          name="durationMultiplier"
          label=" "
          items={[
            { label: t("mission.creation.duration.days"), value: 1 },
            { label: t("mission.creation.duration.weeks"), value: 7 },
            { label: t("mission.creation.duration.months"), value: 30 },
          ]}
          control={form.control}
          className="flex-1"
        />
      </View>
      <View className="h-[1px] bg-neutral-300 w-[80%] my-8 mx-auto" />
      <Text className="font-bold text-neutral-500 mb-4">
        {t("mission.creation.helper.categories")}
      </Text>
      <Collapsable className="flex-1">
        <TagCloud name="categories" control={form.control} options={types} />
      </Collapsable>
      <View className="h-[1px] bg-neutral-300 w-[80%] my-8 mx-auto" />
      <Text className="font-bold text-neutral-500 mb-6 text-center">
        {t("mission.creation.helper.location")}
      </Text>
      <Button
        icon="map-marker"
        variant="secondary"
        label={address?.formatted_address || t("mission.creation.location.pick")}
        onPress={() => setMapOpen((p) => !p)}
      />
      <MapPicker
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        name="location"
        control={form.control}
      />
      <Button onPress={onSubmit} label={t("action.save")} className="mb-4 mt-16" />
      <Spinner visible={isLoading} />
    </Container>
  );
}
