import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
export default queryClient;
export const queryOptions = {
  staleTime: 5 * 60 * 1000,
  cacheTime: 10 * 60 * 1000,
  refetchOnWindowFocus: true,
  refetchOnMount: false,
  placeholderData: (previousData: any) => previousData,
};
