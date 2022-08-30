import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import type { PropsWithChildren } from 'react';

const theme = createTheme({
  components: {
    MuiAlert: {
      defaultProps: {
        elevation: 6,
        variant: 'filled',
      },
      styleOverrides: {
        action: {
          alignItems: 'center',
          height: 'inherit',
          paddingLeft: '12px',
          paddingTop: '0px',
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed',
      },
    },
    MuiBreadcrumbs: {
      defaultProps: {
        color: 'inherit',
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          padding: '4px',
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        fullWidth: true,
        maxWidth: 'md',
      },
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: '0px',
          paddingRight: '4px',
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        color: 'inherit',
        size: 'small',
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiList: {
      defaultProps: {
        dense: true,
        disablePadding: true,
      },
    },
    MuiListItem: {
      defaultProps: {
        disableGutters: true,
      },
    },
    MuiListItemIcon: {
      defaultProps: {
        style: {
          marginRight: '6px',
          minWidth: 'fit-content',
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        keepMounted: true,
        MenuListProps: { dense: true },
      },
    },
    MuiModal: {
      defaultProps: {
        keepMounted: true,
      },
    },
    MuiPopover: {
      defaultProps: {
        elevation: 4,
      },
    },
    MuiRadio: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          padding: '4px',
        },
      },
    },
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      },
    },
    MuiTable: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: 'small',
      },
    },
    MuiToolbar: {
      defaultProps: {
        style: {
          paddingLeft: '6px',
          paddingRight: '6px',
        },
        variant: 'dense',
      },
    },
  },
  palette: {
    primary: {
      main: '#0097a7',
    },
  },
});

export default function Theme({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
}
