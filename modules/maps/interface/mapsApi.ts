import axios from "axios";
import { LatLng } from "react-native-maps";

export const geocode = async (address: string) => {
  const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
    params: {
      key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY,
      address,
    },
  });
  return response.data.results[0].geometry;
};

export const reverseGeocode = async (coords: LatLng | undefined) => {
  if (!coords) return;
  const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
    params: {
      key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY,
      latlng: `${coords.latitude},${coords.longitude}`,
    },
  });
  return response.data.results[0].formatted_address;
};
