import type { ReactNode } from 'react';
import { LoaderFunction } from 'react-router-dom';

interface RouteConfig {
  name?: string; // To search for parent
  element: ReactNode;
  index?: boolean;
  loader?: LoaderFunction;
  path?: string;
  parent?: string;
}

export default RouteConfig;
