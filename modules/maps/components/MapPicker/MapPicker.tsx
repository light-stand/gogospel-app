import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Modal, ScrollView, TouchableOpacity, View } from "react-native";
import clsx from "clsx";
import { Control, useController } from "react-hook-form";
import MapView, { LatLng, MapPressEvent, Marker } from "react-native-maps";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Container, Icon, IconButton, Input, Text } from "@/components";
import { autoComplete, AutoCompleteResult, getPlaceDetails } from "@/maps/interface/mapsApi";
import { mapSettings } from "@/mission/components/MissionMap/settings";

export interface MapPickerProps {
  open?: boolean;
  onClose?: () => void;
  name: string;
  control: Control<any, any>;
  className?: string;
  style?: object[];
}

export type MapPickerValue = LatLng & { locationName: string };

const MapPicker: React.FC<MapPickerProps> = ({ open, onClose, name, control, style }) => {
  const { t } = useTranslation();
  const mapRef = useRef<MapView>(null);
  const { top, bottom } = useSafeAreaInsets();
  const { field } = control ? useController({ control, name }) : { field: null };
  const [searchValue, setSearchValue] = useState("");
  const location = field?.value as MapPickerValue;

  const { data: autoCompleteOptions, refetch: triggerAutoCompleteFetch } = useQuery({
    queryKey: ["autoComplete", searchValue],
    queryFn: () => autoComplete(searchValue, location),
    enabled: false,
  });

  const onLocationPress = async ({ place_id, description }: AutoCompleteResult) => {
    const placeInfo = await getPlaceDetails(place_id);
    const coords = placeInfo.geometry.location;
    field?.onChange({
      latitude: coords.lat,
      longitude: coords.lng,
      locationName: description,
      country:
        placeInfo.address_components?.find(
          (c: { long_name: string; short_name: string; types: string[] }) =>
            c.types.includes("country")
        )?.short_name || "",
    });
    setSearchValue("");
  };

  // Debounce the search value
  useEffect(() => {
    const timeout = setTimeout(triggerAutoCompleteFetch, 500);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  useEffect(() => {
    if (open && location) {
      mapRef.current?.setCamera({
        center: location,
        zoom: 15,
      });
    }
  }, [open, location]);

  // Avoid items overflow
  const maxHeight = Dimensions.get("window").height - 256 - 240 - top - bottom;

  return (
    <Modal animationType="slide" visible={open}>
      <Container
        className="bg-white flex-1"
        keyboardAware
        scroll
        style={[{ marginTop: top, marginBottom: bottom }]}
      >
        <IconButton
          icon="close"
          className="absolute right-4 top-4 z-10"
          variant="primary"
          onPress={onClose}
        />
        <View className="flex-1">
          <Text className="font-bold text-3xl mb-10">{t(`profiling.titles.name`)}</Text>
          <View className="rounded-2xl overflow-hidden">
            <MapView
              className="h-64"
              ref={mapRef}
              showsUserLocation
              provider="google"
              customMapStyle={mapSettings.customMapStyle}
            >
              {location && <Marker coordinate={location} />}
            </MapView>
          </View>
          <View className="mt-4 z-10">
            <View className="flex-row justify-center gap-x-1">
              <Icon name="map-marker-check" className="text-neutral-600" />
              <Text className="text-center mb-3 text-base font-semibold" numberOfLines={1}>
                {location?.locationName || t("maps.picker.helper")}
              </Text>
            </View>
            <Input onChangeText={setSearchValue} value={searchValue} placeholder="Buscar..." />
            <View className="mt-2">
              {!!autoCompleteOptions?.length && (
                <ScrollView
                  className="rounded-lg bg-white px-4 border border-neutral-300 absolute w-full"
                  style={{ maxHeight }}
                >
                  {autoCompleteOptions?.map((option, index) => (
                    <TouchableOpacity
                      className={clsx(
                        "py-3",
                        index < autoCompleteOptions.length - 1 && "border-b border-neutral-200"
                      )}
                      key={index}
                      onPress={() => onLocationPress(option)}
                    >
                      <Text>{option.description}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
          </View>
          <Button label={t("maps.picker.confirm")} className="mt-auto" onPress={onClose} />
        </View>
      </Container>
    </Modal>
  );
};

export default MapPicker;
