import { useSnackbar } from '@/common/feedback/Snackbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

/**
 * React-router-dom will add an option to prefetch data, so queryClient
 * must be available in that context
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {},
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
  const snackbar = useSnackbar();
  // @ts-ignore
  queryClient.getDefaultOptions().mutations.onError = (error) => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    snackbar.open({
      message: typeof error === 'string' ? error : (error as Error).message,
      severity: 'error',
    });
  };
  // @ts-ignore
  queryClient.getDefaultOptions().mutations.onSuccess = () => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    snackbar.open({ message: 'La operación de realizó correctamente', severity: 'success' });
  };
  // @ts-ignore
  queryClient.getDefaultOptions().queries.onError = (error) => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    snackbar.open({
      message: typeof error === 'string' ? error : (error as Error).message,
      severity: 'error',
    });
  };
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
