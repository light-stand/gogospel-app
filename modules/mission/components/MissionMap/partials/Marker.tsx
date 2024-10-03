import * as MapView from "react-native-maps";
import ClusterMarker from "./ClusterMarker";
import { Mission } from "@/mission/domain/Mission";
import { missionTypes } from "@/mission/domain/MissionType";
import colors from "tailwindcss/colors";

export const Marker = ({
  marker,
  mission,
  onPress,
}: {
  marker: any;
  mission?: Mission;
  onPress?: (id: string) => void;
}) => {
  const key = marker.properties.id || marker.geometry.coordinates[0];

  // If a cluster
  if (!marker.properties.id) {
    return (
      <MapView.Marker
        key={key}
        coordinate={{
          latitude: marker.geometry.coordinates[1],
          longitude: marker.geometry.coordinates[0],
        }}
      >
        <ClusterMarker count={marker.properties.point_count} />
      </MapView.Marker>
    );
  }
  const mainCategory = mission?.categories[0];
  const colorKey = mainCategory ? missionTypes[mission?.categories[0]].color : "neutral";
  const color = colors[colorKey][800];

  return (
    <MapView.Marker
      key={key}
      pinColor={color}
      style={{
        backgroundColor: color,
      }}
      onPress={() => onPress && onPress(marker.properties.id)}
      coordinate={{
        latitude: marker.geometry.coordinates[1],
        longitude: marker.geometry.coordinates[0],
      }}
    />
  );
};
