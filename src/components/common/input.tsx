import { TextField } from '@mui/material';
import { ChangeEventHandler, ReactNode } from 'react';
import { inputStyle } from './commonStyle';

interface InputProps {
  name?: string;
  id: string;
  fullWidth?: boolean;
  label?: string;
  type?: string;
  value?: unknown;
  onChange?: ChangeEventHandler;
  error?: boolean | undefined;
  helperText?: ReactNode;
  hidden?: boolean;
  customstyle?: object;
  readOnly?: boolean;
}

const Input = ({
  fullWidth = false,
  name,
  label,
  type,
  id,
  value,
  onChange,
  error,
  helperText,
  hidden = false,
  customstyle,
  readOnly,
}: InputProps) => {
  return (
    <TextField
      id={id}
      name={name}
      fullWidth={fullWidth}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      sx={{ ...inputStyle, ...customstyle }}
      hidden={hidden}
      InputProps={{
        readOnly,
      }}
    />
  );
};
export default Input;
