import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      suspense: true,
    },
  },
});

export default function ReactQuery({ children }: PropsWithChildren<unknown>) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
