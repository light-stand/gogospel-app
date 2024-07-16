export type Mission = {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
};

export type MissionViewInput = {
  min_lat: number;
  min_long: number;
  max_lat: number;
  max_long: number;
};
