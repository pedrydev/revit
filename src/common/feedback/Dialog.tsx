import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import type { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { cloneElement, createContext, useContext, useMemo, useRef, useState } from 'react';

export interface DialogCancelButtonOptions {
  onClick?: () => void;
  label: string;
}

export interface DialogSubmitButtonOptions {
  // eslint-disable-next-line no-unused-vars
  onClick: (data: unknown) => void;
  label: string;
}

export interface DialogState {
  cancelOptions?: DialogCancelButtonOptions;
  content: ReactNode;
  open: boolean;
  submitOptions?: DialogSubmitButtonOptions;
  title: ReactNode;
}

export type OpenDialogOptions = Omit<DialogState, 'open'>;

export interface DialogFunctions {
  close: () => void;
  // eslint-disable-next-line no-unused-vars
  open: (options: OpenDialogOptions) => void;
}

// @ts-ignore
const DialogStateContext = createContext<DialogState>();

// @ts-ignore
const DialogFunctionsContext = createContext<DialogFunctions>();

export function DialogProvider({ children }: PropsWithChildren<unknown>) {
  const [state, setState] = useState<DialogState>({
    open: false,
    content: null,
    title: '',
  });
  const functions = useMemo(
    () => ({
      close: () => {
        setState((s) => ({ ...s, open: false }));
      },
      open: (options: OpenDialogOptions) => {
        setState({ ...options, open: true });
      },
    }),
    []
  );

  return (
    <DialogFunctionsContext.Provider value={functions}>
      <DialogStateContext.Provider value={state}>{children}</DialogStateContext.Provider>
    </DialogFunctionsContext.Provider>
  );
}

export interface DialogContentRef {
  clearData: () => void;
  getData: () => unknown;
}

export function DialogConsumer() {
  const { close } = useContext(DialogFunctionsContext);
  const { cancelOptions, content, open, submitOptions, title } = useContext(DialogStateContext);
  const contentRef = useRef<DialogContentRef | undefined>();

  const handleCancel = () => {
    close();
    contentRef.current?.clearData();
    if (cancelOptions?.onClick) cancelOptions.onClick();
  };

  const handleSubmit = () => {
    if (submitOptions) {
      const data = contentRef.current?.getData();
      submitOptions.onClick(data);
      contentRef.current?.clearData();
      close();
    }
  };

  return (
    <MuiDialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <div className='pt-1.5'>
          {content && cloneElement(content as ReactElement, { ref: contentRef })}
        </div>
      </DialogContent>
      <DialogActions>
        {submitOptions && <Button onClick={handleSubmit}>{submitOptions.label}</Button>}
        {cancelOptions && <Button onClick={handleCancel}>{cancelOptions.label}</Button>}
      </DialogActions>
    </MuiDialog>
  );
}

export function useDialog() {
  return useContext(DialogFunctionsContext);
}
