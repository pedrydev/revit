import Home from '@mui/icons-material/Home';
import Info from '@mui/icons-material/Info';
import List from '@mui/icons-material/List';

import MainContent from '@/common/layout/MainContent';
import PageWithNavigationSidebar from '@/common/layout/PageWithNavigationSidebar';
import type { SidebarOption } from '@/common/layout/Sidebar';
import RouteChildren from '@/routing/RouteChildren';
import { useLayout } from '@/app/Layout';

const options: SidebarOption[] = [
  { Icon: Home, label: 'Home', link: '/' },
  { Icon: Info, label: 'Info', link: 'about' },
  { Icon: List, label: 'Todos', link: 'todos' },
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
