import { AppBar as MuiNavbar, Toolbar } from '@mui/material';

import AccountIcon from './AccountIcon';
import HeaderTitle from './HeaderTitle';
import HelpIcon from './HelpIcon';
import LanguageSwitchIcon from './LanguageSwitchIcon';
import ModulesIcon from './ModulesIcon';

export default function Header() {
  return (
    <MuiNavbar>
      <Toolbar className='flex justify-between w-full'>
        <div className='flex items-center'>
          <ModulesIcon />
          <HeaderTitle />
        </div>
        <nav className='flex space-x-1.5'>
          <LanguageSwitchIcon />
          <HelpIcon />
          <AccountIcon />
        </nav>
      </Toolbar>
    </MuiNavbar>
  );
}
