import { TouchableOpacity, View } from "react-native";
import * as MapView from "react-native-maps";
import colors from "tailwindcss/colors";

import { Mission } from "@/mission/domain/Mission";
import { missionTypes } from "@/mission/domain/MissionType";
import ClusterMarker from "./ClusterMarker";
import { Icon } from "@/components";

export const Marker = ({
  marker,
  mission,
  onPress,
}: {
  marker: any;
  mission?: Mission;
  onPress?: (id: number) => void;
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
  const icon = mainCategory ? missionTypes[mission?.categories[0]].icon : "map-marker";
  const color = colors[colorKey];

  return (
    <MapView.Marker
      key={key}
      onPress={() => onPress && onPress(marker.properties.id)}
      tracksViewChanges={false}
      coordinate={{
        latitude: marker.geometry.coordinates[1],
        longitude: marker.geometry.coordinates[0],
      }}
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <View
        style={{
          backgroundColor: color[500],
          borderColor: color[600],
        }}
        className="rounded-full p-1 aspect-square border-2 items-center"
      >
        <Icon name={icon} className="text-white text-xs" />
      </View>
    </MapView.Marker>
  );
};
