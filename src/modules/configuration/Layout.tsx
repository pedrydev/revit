import SettingsApplications from '@mui/icons-material/SettingsApplications';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';

import MainContent from '@/common/layout/MainContent';
import PageWithNavigationSidebar from '@/common/layout/PageWithNavigationSidebar';
import type { SidebarOption } from '@/common/layout/Sidebar';
import RouteChildren from '@/routing/RouteChildren';
import { useLayout } from '@/app/Layout';

const options: SidebarOption[] = [
  { Icon: SettingsApplications, label: 'App Settings', link: '/configuration' },
  { Icon: AdminPanelSettings, label: 'Users', link: 'users' },
];

export default function Layout() {
  useLayout({ currentModule: 'Configuration' });
  return (
    <PageWithNavigationSidebar sidebarOptions={options}>
      <MainContent header='Configuration'>
        <RouteChildren />
      </MainContent>
    </PageWithNavigationSidebar>
  );
}
