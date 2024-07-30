import React, { useEffect, useRef } from "react";
import { Modal, View } from "react-native";
import { Control, useController } from "react-hook-form";
import MapView, { LatLng, MapPressEvent, Marker } from "react-native-maps";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, IconButton, Text } from "@/components";
import { reverseGeocode } from "@/maps/interface/mapsApi";
import { getLocation } from "@/maps/interface/mapsService";

export interface MapPickerProps {
  open?: boolean;
  onClose?: () => void;
  name: string;
  control: Control<any, any>;
  className?: string;
  style?: object[];
}

const MapPicker: React.FC<MapPickerProps> = ({ open, onClose, name, control, style }) => {
  const { t } = useTranslation();
  const mapRef = useRef<MapView>(null);
  const { bottom } = useSafeAreaInsets();
  const { field } = control ? useController({ control, name }) : { field: null };
  const location = field?.value as LatLng | undefined;
  const error = null;

  const { data: address } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => reverseGeocode(location),
  });

  const onPress = async (event: MapPressEvent) => {
    field?.onChange(event.nativeEvent.coordinate);
  };

  const onCurrentLocationPress = async () => {
    const location = await getLocation();
    field?.onChange(location);
    if (location) {
      mapRef.current?.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  };

  useEffect(() => {
    if (open && location) {
      const map = mapRef.current as MapView;
      map.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [open]);

  return (
    <Modal animationType="slide" visible={open}>
      <IconButton
        icon="close"
        className="absolute right-6 top-6 z-10"
        variant="primary"
        onPress={onClose}
      />
      <View style={[style, { paddingBottom: bottom }]} className="flex-1 w-full">
        <MapView className="flex-1" onPress={onPress} ref={mapRef} showsUserLocation>
          {location && <Marker coordinate={location} />}
        </MapView>
        <View className="z-10 bg-white w-full shadow-2xl p-2">
          <IconButton
            icon="crosshairs-gps"
            className="absolute right-6 -top-16 z-10"
            variant="primary"
            onPress={onCurrentLocationPress}
          />
          <Text className="text-center mb-3 mt-1" numberOfLines={1}>
            {address || t("maps.picker.helper")}
          </Text>
          <Button label={t("maps.picker.confirm")} onPress={onClose} />
        </View>

        {error && <Text className="text-sm mt-1 text-center text-red-500">{error}</Text>}
      </View>
    </Modal>
  );
};

export default MapPicker;
