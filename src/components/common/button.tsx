import MaterialButton from '@mui/material/Button';
import { ReactNode } from 'react';

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
}

const Button = ({
  color = 'primary',
  onClick,
  children,
  fullWidth = false,
}: ButtonProps) => {
  return (
    <MaterialButton
      color={color}
      onClick={onClick}
      variant="contained"
      fullWidth={fullWidth}
    >
      {children}
    </MaterialButton>
  );
};

export default Button;
