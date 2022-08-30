import Home from '@mui/icons-material/Home';
import Info from '@mui/icons-material/Info';

import MainContent from '@/common/layout/MainContent';
import PageWithNavigationSidebar from '@/common/layout/PageWithNavigationSidebar';
import type { SidebarOption } from '@/common/layout/Sidebar';
import RouteChildren from '@/routing/RouteChildren';
import { useLayout } from '@/app/Layout';

const options: SidebarOption[] = [
  { Icon: Home, label: 'Home', link: '/' },
  { Icon: Info, label: 'Info', link: 'about' },
];

export default function Layout() {
  useLayout({ currentModule: 'Home' });

  return (
    <PageWithNavigationSidebar sidebarOptions={options}>
      <MainContent header='Home layout'>
        <RouteChildren />
      </MainContent>
    </PageWithNavigationSidebar>
  );
}
