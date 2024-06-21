import axios from "axios";
import { QueryClient } from "react-query";

import type { QueryFunctionContext, QueryKey } from "react-query";

const defaultQueryFn = async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
  const { data } = await axios.get(`https://api.github.com${queryKey[0]}`);
  return data;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});
