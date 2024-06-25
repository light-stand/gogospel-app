import axios, { AxiosHeaders } from "axios";
import { QueryClient } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { QueryFunctionContext, QueryKey } from "react-query";

const supabaseApiUrl = process.env.EXPO_PUBLIC_SB_API_REST_URL || "";
const supabaseApiKey = process.env.EXPO_PUBLIC_SB_API_KEY || "";

const defaultQueryFn = async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
  const jwtToken = await AsyncStorage.getItem("token");
  const headers = new AxiosHeaders();
  headers.set("apiKey", supabaseApiKey);

  if (jwtToken) {
    headers.set("Authorization", `Bearer ${jwtToken}`);
  }
  console.log(jwtToken);
  const { data } = await axios.get(supabaseApiUrl + queryKey[0], { headers });

  return data;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});
