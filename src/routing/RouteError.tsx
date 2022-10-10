import Info from '@mui/icons-material/Info';
import { Typography } from '@mui/material';

export default function RouteError() {
  return (
    <div className='flex flex-col items-center mt-3 space-y-3'>
      <Info color='error' sx={{ fontSize: '60px' }} />
      <Typography color='error' variant='h4'>
        No se pudo cargar la ruta
      </Typography>
    </div>
  );
}
