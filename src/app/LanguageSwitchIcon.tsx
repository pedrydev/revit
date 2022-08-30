import Language from '@mui/icons-material/Language';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import useToggle from '@/common/form/useToggle';

export default function LanguageSwitchIcon() {
  const anchor = useRef<HTMLButtonElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, toggle] = useToggle();
  const { t, i18n } = useTranslation();

  const handleLangChange = (lang: string) => () => {
    if (i18n.language !== lang) {
      window.localStorage.setItem('lang', lang);
      toggle();
      setSearchParams({ ...searchParams, lang });
      i18n.changeLanguage(lang);
    }
  };

  return (
    <>
      <IconButton ref={anchor} onClick={toggle}>
        <Language />
      </IconButton>
      <Menu
        anchorEl={anchor.current}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClose={toggle}
        open={open}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ mt: 1 }}
      >
        <MenuItem onClick={handleLangChange('es')} value='es'>
          <img alt={t('spanish')} className='mr-1.5' src='https://flagcdn.com/es.svg' width='24' />
          {t('spanish')}
        </MenuItem>
        <MenuItem onClick={handleLangChange('en')} value='en'>
          <img
            alt={t('english')}
            className='mr-1.5'
            src='https://flagcdn.com/gb.svg'
            width='24'
            height='18'
          />
          {t('english')}
        </MenuItem>
      </Menu>
    </>
  );
}
