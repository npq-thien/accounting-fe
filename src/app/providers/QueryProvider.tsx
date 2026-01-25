import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { notify } from "@/app/toast/toast";
import type { ApiError } from "@/services/httpClient/http";
import type React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (count, error: ApiError) => {
        if (error.status === 401 || error.status === 403) return false;
        return count < 2;
      },
      refetchOnWindowFocus: true,
      staleTime: 30_000,
    },
    mutations: {
      onError: (error: ApiError) => {
        notify.error(error.message);
      },
    },
  },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
