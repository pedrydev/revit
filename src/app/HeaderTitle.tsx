import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Breadcrumbs, Typography } from '@mui/material';

import { useLayoutState } from './Layout';

export default function HeaderTitle() {
  const layout = useLayoutState();

  return (
    <Breadcrumbs separator={<KeyboardDoubleArrowRight />}>
      <Typography className='pl-3.5' component='h1' variant='h6'>
        {import.meta.env.VITE_APP_NAME}
      </Typography>
      {layout.currentModule && (
        <Typography component='h2' variant='h6'>
          {layout.currentModule}
        </Typography>
      )}
    </Breadcrumbs>
  );
}
