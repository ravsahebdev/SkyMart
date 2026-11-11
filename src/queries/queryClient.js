import { QueryClient } from "@tanstack/react-query";

// poori app ka ek hi QueryClient - cache yahin rehta hai
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min tak data "fresh" - dobara API call nahi
      gcTime: 30 * 60 * 1000, // unused data 30 min cache me
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
