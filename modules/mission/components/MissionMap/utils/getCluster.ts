import supercluster from "supercluster";
import { Mission } from "@/mission/domain/Mission";

function getZoomLevel(longitudeDelta: any) {
  const angle = longitudeDelta;
  return Math.round(Math.log(360 / angle) / Math.LN2);
}

export function getCluster(missions: Mission[], region: any) {
  const allCoords = missions
    .filter((m) => !!m.long && !!m.lat)
    .map((m) => ({
      geometry: {
        coordinates: [m.long as number, m.lat as number],
      },
      properties: {
        id: m.id,
      },
    }));

  const cluster = new supercluster({
    radius: 40,
    maxZoom: 16,
  });

  let markers: any = [];

  try {
    const padding = 0;

    cluster.load(allCoords);

    markers = cluster.getClusters(
      [
        region.longitude - region.longitudeDelta * (0.5 + padding),
        region.latitude - region.latitudeDelta * (0.5 + padding),
        region.longitude + region.longitudeDelta * (0.5 + padding),
        region.latitude + region.latitudeDelta * (0.5 + padding),
      ],
      getZoomLevel(region.longitudeDelta)
    );
  } catch (e) {
    console.debug("failed to create cluster", e);
  }

  return {
    markers,
    cluster,
  };
}
