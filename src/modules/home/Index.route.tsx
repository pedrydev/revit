import { lazy } from 'react';

import type RouteConfig from '@/routing/RouteConfig';

const Page = lazy(async () => import('./Index'));

const config: RouteConfig = {
  element: <Page />,
  index: true,
  parent: 'HomeLayout',
};

export default config;
