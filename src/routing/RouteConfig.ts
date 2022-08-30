import type { ReactNode } from 'react';

interface RouteConfig {
  name?: string; // To search for parent
  element: ReactNode;
  index?: boolean;
  path?: string;
  parent?: string;
}

export default RouteConfig;
