import { ReactNode } from 'react';

export interface ReactQueryProviderProps {
  children: ReactNode;
}

interface TextItem {
  text: string;
  variant?: 'blue';
  color?: string;
  break?: boolean;
}

export interface MixColorsTextProps {
  content: TextItem[];
  className?: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'disable';

export interface ButtonProps {
  content: string;
  variant?: ButtonVariant;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
}
