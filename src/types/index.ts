import { ReactNode } from 'react';

export interface ReactQueryProviderProps {
  children: ReactNode;
}

export interface TextItem {
  text: string;
  variant?: 'blue' | 'neutral-300' | 'neutral-500';
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

export interface MiddleContentProps {
  top: { titleProps: MixColorsTextProps; subtitleProps: MixColorsTextProps };
  bottom: { textProps: MixColorsTextProps; buttonProps: ButtonProps };
}
