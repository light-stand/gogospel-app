import axios, { AxiosHeaders } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import { useMutation as useRQMutation } from "react-query";

const supabaseApiUrl = process.env.EXPO_PUBLIC_SB_API_REST_URL || "";
const supabaseApiKey = process.env.EXPO_PUBLIC_SB_API_KEY || "";

export const mutation =
  <TData = unknown, TVariables = void>(
    path: string
  ): MutationFunction<TData, TVariables> =>
  async (params: TVariables) => {
    const jwtToken = await AsyncStorage.getItem("token");
    const headers = new AxiosHeaders();
    headers.set("apiKey", supabaseApiKey);

    if (jwtToken) headers.set("Authorization", `Bearer ${jwtToken}`);

    console.log(supabaseApiUrl + path);

    const { data: responseData } = await axios.post<TData>(
      supabaseApiUrl + path,
      params,
      { headers }
    );

    return responseData;
  };

export const useMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  path: string,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> => {
  return useRQMutation<TData, TError, TVariables, TContext>({
    mutationFn: mutation<TData, TVariables>(path),
    mutationKey: [path],
    ...options,
  });
};
