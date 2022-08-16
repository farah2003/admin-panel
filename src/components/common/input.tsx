import TextField from '@mui/material/TextField';

interface InputProps {
  fullWidth?: boolean;
  label: string;
}

const Input = ({ fullWidth = false, label }: InputProps) => {
  return <TextField fullWidth={fullWidth} label={label} variant="outlined" />;
};
export default Input;
