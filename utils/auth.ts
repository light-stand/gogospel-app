import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export const getUser = async () => {
  const token = await AsyncStorage.getItem("token");
  if (!token) return;
  return jwtDecode(token);
};
