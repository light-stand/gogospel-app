import axios from "axios";

export const login = async (data: { email: string; password: string }) => {
  const response = await axios.post("/auth/v1/token?grant_type=password", data);
  return response.data;
};

export const signup = async (data: { email: string; password: string }) => {
  const response = await axios.post("/auth/v1/signup", data);
  return response.data;
};
