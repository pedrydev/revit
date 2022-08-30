import AccountCircle from '@mui/icons-material/AccountCircle';
import { IconButton, Tooltip } from '@mui/material';

export default function AccountIcon() {
  return (
    <>
      <Tooltip title='Account'>
        <IconButton>
          <AccountCircle />
        </IconButton>
      </Tooltip>
    </>
  );
}
