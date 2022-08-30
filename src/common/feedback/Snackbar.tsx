import { Alert, Snackbar as MuiSnackbar } from '@mui/material';
import type { PropsWithChildren, ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

export interface SnackbarState {
  message: ReactNode;
  open: boolean;
  severity: 'error' | 'info' | 'success' | 'warning';
}

export type OpenSnackbarOptions = Omit<SnackbarState, 'open'>;

export interface SnackbarFunctions {
  close: () => void;
  // eslint-disable-next-line no-unused-vars
  open: (options: OpenSnackbarOptions) => void;
}

// @ts-ignore
const SnackbarStateContext = createContext<SnackbarState>();

// @ts-ignore
const SnackbarFunctionsContext = createContext<SnackbarFunctions>();

export function SnackbarProvider({ children }: PropsWithChildren<unknown>) {
  const [state, setState] = useState<SnackbarState>({
    message: '',
    open: false,
    severity: 'info',
  });
  const functions = useMemo(
    () => ({
      close: () => {
        setState((s) => ({ ...s, open: false }));
      },
      open: (options: OpenSnackbarOptions) => {
        setState({ ...options, open: true });
      },
    }),
    []
  );

  return (
    <SnackbarFunctionsContext.Provider value={functions}>
      <SnackbarStateContext.Provider value={state}>{children}</SnackbarStateContext.Provider>
    </SnackbarFunctionsContext.Provider>
  );
}

export function SnackbarConsumer() {
  const { close } = useContext(SnackbarFunctionsContext);
  const { message, open, severity } = useContext(SnackbarStateContext);

  return (
    <MuiSnackbar open={open}>
      <Alert onClose={close} severity={severity}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
}

export function useSnackbar() {
  return useContext(SnackbarFunctionsContext);
}
