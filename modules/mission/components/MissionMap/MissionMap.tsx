import React, { useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import MapView, { LatLng, Region } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mapSettings } from "./settings";
import { Mission } from "@/mission/domain/Mission";
import { getCluster } from "./utils/getCluster";
import { Marker } from "./partials/Marker";

interface MapWithMarkersProps {
  focused: number;
  setFocused: (index: number) => void;
  missions?: Mission[];
}

const MissionMap: React.FC<MapWithMarkersProps> = ({ focused, missions, setFocused, ...props }) => {
  const padding = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  useEffect(() => {
    if (!missions || missions.length === 0) return;
    const map = mapRef.current as MapView;
    const mission = missions.find((m) => m.id === focused);
    if (!mission) return;
    map.animateCamera({
      center: {
        latitude: mission.lat as number,
        longitude: mission.long as number,
      },
      heading: 0,
      pitch: 0,
    });
  }, [focused]);

  const cluster = useMemo(
    () => (missions ? getCluster(missions, region) : { markers: [] }),
    [region, missions]
  );

  return (
    <View className="justify-center flex-1 ">
      <MapView
        className="flex-1"
        {...props}
        {...mapSettings}
        mapPadding={padding}
        ref={mapRef}
        showsUserLocation={true}
        onRegionChange={setRegion}
      >
        {cluster.markers.map((marker, index) => (
          <Marker
            marker={marker}
            mission={marker.properties.id && missions?.find((m) => m.id === marker.properties.id)}
            key={marker.properties.id || marker.geometry.coordinates[0]}
            onPress={setFocused}
          />
        ))}

        {/* {missions?.map(({ lat, long }, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: lat, longitude: long } as LatLng}
            onPress={() => setFocused(index)}
          />
        ))} */}
      </MapView>
    </View>
  );
};

export default MissionMap;
