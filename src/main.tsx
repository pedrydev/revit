import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Layout from '@/app/Layout';
import { DialogConsumer, DialogProvider } from '@/common/feedback/Dialog';
import { SnackbarConsumer, SnackbarProvider } from '@/common/feedback/Snackbar';
import I18n from '@/providers/I18n';
import Theme from '@/providers/Theme';
import Routes from '@/routing/Routes';

import './styles/scroll-bar.css';
import './styles/tailwind.css';
import ReactQuery from './providers/ReactQuery';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Theme>
      <BrowserRouter>
        <DialogProvider>
          <SnackbarProvider>
            <I18n>
              <ReactQuery>
                <Layout>
                  <Routes />
                </Layout>
                <DialogConsumer />
                <SnackbarConsumer />
              </ReactQuery>
            </I18n>
          </SnackbarProvider>
        </DialogProvider>
      </BrowserRouter>
    </Theme>
  </StrictMode>
);
