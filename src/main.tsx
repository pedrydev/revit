import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DialogConsumer, DialogProvider } from '@/common/feedback/Dialog';
import { SnackbarConsumer, SnackbarProvider } from '@/common/feedback/Snackbar';
import I18n from '@/providers/I18n';
import ReactQuery from '@/providers/ReactQuery';
import Theme from '@/providers/Theme';
import Routes from '@/routing/Routes';

import './styles/scroll-bar.css';
import './styles/tailwind.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Theme>
      <I18n>
        <DialogProvider>
          <SnackbarProvider>
            <ReactQuery>
              <Routes />
              <DialogConsumer />
              <SnackbarConsumer />
            </ReactQuery>
          </SnackbarProvider>
        </DialogProvider>
      </I18n>
    </Theme>
  </StrictMode>
);
