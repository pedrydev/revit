import { CircularProgress } from '@mui/material';

export interface SpinnerProps {
  variant: 'data' | 'icon' | 'page';
}

export default function Spinner({ variant = 'data' }: SpinnerProps) {
  let size = 32;

  if (variant === 'icon') size = 24;
  else if (variant === 'page') size = 40;

  return (
    <div className={`flex items-center justify-center ${variant === 'page' && 'mt-1.5'}`}>
      <CircularProgress size={size} />
    </div>
  );
}
