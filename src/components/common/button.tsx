import MaterialButton from '@mui/material/Button';
import { ReactNode } from 'react';
import { buttonStyle } from './commonStyle';

interface ButtonProps {
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined;
  onClick?: () => void;
  children?: ReactNode;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  customstyle?: object;
  disabled?: boolean;
}

const Button = ({
  color = 'primary',
  onClick,
  children,
  fullWidth = false,
  type = 'button',
  customstyle = buttonStyle,
  disabled = false,
}: ButtonProps) => {
  return (
    <MaterialButton
      color={color}
      onClick={onClick}
      variant="contained"
      fullWidth={fullWidth}
      type={type}
      sx={{ ...customstyle, ...buttonStyle }}
      disabled={disabled}
    >
      {children}
    </MaterialButton>
  );
};

export default Button;
