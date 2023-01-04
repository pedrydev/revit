import Help from '@mui/icons-material/Help';
import { IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export default function HelpIcon() {
  const location = useLocation();
  const { t } = useTranslation();

  // Generate help link
  const helpUrl = import.meta.env.VITE_APP_HELP_LINK + encodeURIComponent(location.pathname);

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const handleClick = () => window.open(helpUrl, '_blank');

  return (
    <Tooltip title={t('help') as string}>
      <IconButton onClick={handleClick}>
        <Help />
      </IconButton>
    </Tooltip>
  );
}
