import { styled } from '@mui/material';
import type { PropsWithChildren } from 'react';
import { Suspense } from 'react';

import Spinner from '@/common/feedback/Spinner';
import type { SidebarOption } from '@/common/layout/Sidebar';
import { Sidebar } from '@/common/layout/Sidebar';

export interface PageProps {
  sidebarOptions: SidebarOption[];
}

const PageRoot = styled('div')(() => ({
  display: 'flex',
  minHeight: 'inherit',
}));

export default function PageWithNavigationSidebar({
  children,
  sidebarOptions,
}: PropsWithChildren<PageProps>) {
  return (
    <PageRoot>
      <Sidebar options={sidebarOptions} variant='left' />
      <main className={`flex-1 ${sidebarOptions ? 'p-1.5' : ''}`}>
        <Suspense fallback={<Spinner variant='page' />}>{children}</Suspense>
      </main>
    </PageRoot>
  );
}
