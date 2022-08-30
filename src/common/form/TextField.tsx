import type { TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { TextField as MuiTextField } from '@mui/material';

type TextFieldProps = Omit<MuiTextFieldProps, 'onChange'> & {
  onChange: (value: string) => void;
};

export default function TextField({ onChange, ...props }: TextFieldProps) {
  return (
    <MuiTextField
      onChange={(ev) => {
        onChange(ev.target.value);
      }}
      {...props}
    />
  );
}
