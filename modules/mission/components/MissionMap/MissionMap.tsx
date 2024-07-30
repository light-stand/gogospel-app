import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mapSettings } from "./settings";
import { Mission } from "@/mission/domain/Mission";

interface Marker {
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

interface MapWithMarkersProps {
  focused: number;
  setFocused: (index: number) => void;
  missions?: Mission[];
}

const MissionMap: React.FC<MapWithMarkersProps> = ({ focused, missions, setFocused, ...props }) => {
  const padding = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (!missions || missions.length === 0) return;
    const map = mapRef.current as MapView;
    map.animateCamera({
      center: {
        latitude: missions[focused].latitude as number,
        longitude: missions[focused].longitude as number,
      },
      heading: 0,
      pitch: 0,
      zoom: 30,
    });
  }, [focused]);

  return (
    <View className="justify-center flex-1 ">
      <MapView
        className="flex-1"
        {...props}
        {...mapSettings}
        mapPadding={padding}
        ref={mapRef}
        showsUserLocation={true}
      >
        {missions?.map(({ latitude, longitude }, index) => (
          <Marker
            key={index}
            coordinate={{ latitude, longitude } as LatLng}
            onPress={() => setFocused(index)}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MissionMap;
