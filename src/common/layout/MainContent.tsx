import { Divider, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

export type MainContentProps = {
  header?: string;
};

export default function MainContent({ children, header }: PropsWithChildren<MainContentProps>) {
  return (
    <div className='flex flex-col space-y-1.5'>
      {header && (
        <div>
          <Typography variant='h5'>{header}</Typography>
          <Divider />
        </div>
      )}
      {children}
    </div>
  );
}
