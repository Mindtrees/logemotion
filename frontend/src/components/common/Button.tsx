import * as React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface CustomButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const Button: React.FC<CustomButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  sx,
  ...props
}) => {
  const getVariantStyles = (variant: ButtonVariant) => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#1f2937',
          color: 'white',
          boxShadow: '0 2px 4px rgba(31, 41, 55, 0.1)',
          '&:hover': {
            backgroundColor: '#374151',
            boxShadow: '0 4px 12px rgba(31, 41, 55, 0.15)',
            transform: 'translateY(-1px)'
          },
          '&:active': {
            transform: 'translateY(0)',
            backgroundColor: '#111827',
            boxShadow: '0 2px 4px rgba(31, 41, 55, 0.1)'
          }
        };
      case 'secondary':
        return {
          backgroundColor: '#8b5cf6',
          color: 'white',
          boxShadow: '0 2px 4px rgba(139, 92, 246, 0.1)',
          '&:hover': {
            backgroundColor: '#a78bfa',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)',
            transform: 'translateY(-1px)'
          },
          '&:active': {
            transform: 'translateY(0)',
            backgroundColor: '#7c3aed',
            boxShadow: '0 2px 4px rgba(139, 92, 246, 0.1)'
          }
        };
      case 'outlined':
        return {
          color: '#1f2937',
          borderColor: '#1f2937',
          backgroundColor: 'transparent',
          borderWidth: '1px',
          borderStyle: 'solid',
          '&:hover': {
            backgroundColor: 'rgba(31, 41, 55, 0.05)',
            borderColor: '#374151',
            boxShadow: '0 4px 12px rgba(31, 41, 55, 0.15)',
            transform: 'translateY(-1px)'
          },
          '&:active': {
            transform: 'translateY(0)',
            backgroundColor: 'rgba(31, 41, 55, 0.1)',
            boxShadow: 'none'
          }
        };
      case 'text':
        return {
          color: '#1f2937',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(31, 41, 55, 0.08)',
            color: '#111827',
            transform: 'translateY(-1px)'
          },
          '&:active': {
            transform: 'translateY(0)',
            backgroundColor: 'rgba(31, 41, 55, 0.12)'
          }
        };
      default:
        return {};
    }
  };

  const getSizeStyles = (size: ButtonSize) => {
    switch (size) {
      case 'small':
        return {
          px: 2,
          py: 1,
          fontSize: '0.875rem',
          fontWeight: 600
        };
      case 'medium':
        return {
          px: 3,
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 600
        };
      case 'large':
        return {
          px: 4,
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 600
        };
      default:
        return {};
    }
  };

  const muiVariant = variant === 'outlined' ? 'outlined' : 'contained';

  return (
    <MuiButton
      variant={muiVariant}
      sx={{
        ...getVariantStyles(variant),
        ...getSizeStyles(size),
        textTransform: 'none',
        borderRadius: 2,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        ...sx
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;