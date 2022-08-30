import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import Spinner from '@/common/feedback/Spinner';

/**
 * Standar way to handle routes in suspense state
 */
export default function RouteChildren() {
  return (
    <Suspense fallback={<Spinner variant='page' />}>
      <Outlet />
    </Suspense>
  );
}
