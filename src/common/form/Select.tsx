import Clear from '@mui/icons-material/Clear';
import type { TextFieldProps } from '@mui/material';
import { IconButton, InputAdornment, MenuItem, TextField } from '@mui/material';

export type Option<T> = T & {
  id: string;
  label: string;
};

export type SelectProps<T> = Omit<TextFieldProps, 'onChange'> & {
  onChange: (option: Option<T> | string | null) => void;
  options: Option<T>[] | string[];
};

export default function Select<T>({ label, onChange, options, value, ...props }: SelectProps<T>) {
  const handleClear = () => {
    if (typeof value === 'string') onChange('');
    else onChange(null);
  };

  const renderStringOption = (option: string) => (
    <MenuItem
      key={option}
      onClick={() => {
        onChange(option);
      }}
      value={option}
    >
      {option}
    </MenuItem>
  );

  const renderObjectOption = (option: Option<T>) => (
    <MenuItem
      key={option.id}
      onClick={() => {
        onChange(option);
      }}
      value={option.id}
    >
      {option.label}
    </MenuItem>
  );

  return (
    <TextField
      InputProps={{
        endAdornment: (
          <InputAdornment className='pr-3' position='end'>
            <IconButton disabled={!value} onClick={handleClear}>
              <Clear />
            </IconButton>
          </InputAdornment>
        ),
      }}
      label={label}
      select
      value={value}
      {...props}
    >
      {value instanceof String
        ? options.map((o) => renderStringOption(o as string))
        : options.map((o) => renderObjectOption(o as Option<T>))}
    </TextField>
  );
}
