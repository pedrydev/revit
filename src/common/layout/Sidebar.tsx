import KeyboardDoubleArrowLeft from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import type { SvgIconComponent } from '@mui/icons-material';
import { Button, Divider, IconButton, Paper, Tooltip } from '@mui/material';
import { createContext, PropsWithChildren, useContext } from 'react';

import useToggle from '@/common/form/useToggle';
import Link from '@/common/navigation/Link';

const SidebarExpandedContext = createContext<boolean>(false);
// @ts-ignore
const ToggleSidebarExtandedContext = createContext<() => void>();

export interface SidebarOption {
  Icon: SvgIconComponent;
  label: string;
  link: string;
}

export type SidebarVariant = 'left' | 'right';

export interface SidebarProps {
  options: SidebarOption[];
  variant: SidebarVariant;
}

export function SidebarProvider({ children }: PropsWithChildren<unknown>) {
  const [expanded, toggle] = useToggle();

  return (
    <ToggleSidebarExtandedContext.Provider value={toggle}>
      <SidebarExpandedContext.Provider value={expanded}>{children}</SidebarExpandedContext.Provider>
    </ToggleSidebarExtandedContext.Provider>
  );
}

export function Sidebar({ options, variant }: SidebarProps) {
  const expanded = useContext(SidebarExpandedContext);
  const toggle = useContext(ToggleSidebarExtandedContext);

  return (
    <Paper className='flex flex-col p-1.5 space-y-1.5' component='aside' square variant='outlined'>
      {expanded ? (
        <Button
          fullWidth
          onClick={toggle}
          startIcon={
            variant === 'left' ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />
          }
        >
          Contract
        </Button>
      ) : (
        <Tooltip placement={variant === 'left' ? 'right' : 'left'} title='Expand'>
          <IconButton color='primary' onClick={toggle}>
            {variant === 'left' ? <KeyboardDoubleArrowRight /> : <KeyboardDoubleArrowLeft />}
          </IconButton>
        </Tooltip>
      )}
      <Divider />
      {expanded
        ? options.map((o) => (
            <Link key={o.link + '-button'} href={o.link}>
              <Button fullWidth startIcon={<o.Icon />}>
                {o.label}
              </Button>
            </Link>
          ))
        : options.map((o) => (
            <Link key={o.link + '-icon'} href={o.link}>
              <Tooltip placement={variant === 'left' ? 'right' : 'left'} title={o.label}>
                <IconButton>
                  <o.Icon />
                </IconButton>
              </Tooltip>
            </Link>
          ))}
    </Paper>
  );
}
