import { lazy } from 'react';

import type RouteConfig from '@/routing/RouteConfig';

const Page = lazy(async () => import('./ApplicationSettings'));

const config: RouteConfig = {
  element: <Page />,
  index: true,
  parent: 'ConfigurationLayout',
};

export default config;
