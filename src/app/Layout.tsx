import { Toolbar } from '@mui/material';
import {
  PropsWithChildren,
  useEffect,
  useState,
  Suspense,
  createContext,
  useMemo,
  useContext,
} from 'react';

import Spinner from '@/common/feedback/Spinner';
import { SidebarProvider } from '@/common/layout/Sidebar';
import Header from './Header';
import Footer from './Footer';

export interface LayoutState {
  currentModule?: string;
}

export interface LayoutFunctions {
  setCurrentModule: (module: string) => void;
}

// @ts-ignore
const LayoutStateContext = createContext<LayoutState>();

// @ts-ignore
const LayoutFunctionsContext = createContext<LayoutFunctions>();

function useContentHeight() {
  const [height, setHeight] = useState(`${window.innerHeight - 48}px`);

  useEffect(() => {
    function listener() {
      setHeight(`${window.innerHeight - 48}px`);
    }

    window.addEventListener('resize', listener, false);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  return height;
}

function LayoutProvider({ children }: PropsWithChildren<unknown>) {
  const [state, setState] = useState<LayoutState>({
    currentModule: undefined,
  });
  const functions = useMemo<LayoutFunctions>(
    () => ({
      setCurrentModule: (currentModule) => setState((s) => ({ ...s, currentModule })),
    }),
    []
  );

  return (
    <LayoutFunctionsContext.Provider value={functions}>
      <LayoutStateContext.Provider value={state}>{children}</LayoutStateContext.Provider>
    </LayoutFunctionsContext.Provider>
  );
}

export function useLayoutState() {
  return useContext(LayoutStateContext);
}

export function useLayout(state: Partial<LayoutState>) {
  const fns = useContext(LayoutFunctionsContext);

  useEffect(() => {
    if (state.currentModule) fns.setCurrentModule(state.currentModule);
  }, [fns, state]);
}

export default function Layout({ children }: PropsWithChildren<unknown>) {
  const height = useContentHeight();

  return (
    <LayoutProvider>
      <SidebarProvider>
        <Header />
        <Toolbar />
        <div style={{ minHeight: height }}>
          <Suspense fallback={<Spinner variant='page' />}>{children}</Suspense>
        </div>
        <Footer />
      </SidebarProvider>
    </LayoutProvider>
  );
}
