import TextField from '@mui/material/TextField';
import { ChangeEventHandler } from 'react';
import { inputStyle } from './commonStyle';

interface InputProps {
  name?: string;
  id: string;
  fullWidth?: boolean;
  label: string;
  type?: string;
  value?: string;
  onChange?: ChangeEventHandler;
  error?: boolean | undefined;
  helperText?: string | false | undefined;
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
      sx={inputStyle}
    />
  );
};
export default Input;
