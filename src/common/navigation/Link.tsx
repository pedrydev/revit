import type { LinkProps as MuiLinkProps } from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

type LinkProps = Omit<MuiLinkProps, 'component'>;

export default function Link({ href, ...props }: LinkProps) {
  const { i18n } = useTranslation();
  const link = `${href}?lang=${i18n.language}`;
  return <MuiLink component={RouterLink} href={link} to={link} {...props} />;
}
