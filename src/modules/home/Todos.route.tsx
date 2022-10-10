import { lazy } from 'react';

import type RouteConfig from '@/routing/RouteConfig';
import todoService from './services/todo-service';
import { queryClient } from '@/providers/ReactQuery';

const Page = lazy(async () => import('./Todos'));

const config: RouteConfig = {
  element: <Page />,
  loader: () => queryClient.prefetchQuery(['todos'], todoService.get),
  path: 'todos',
  parent: 'HomeLayout',
};

export default config;
