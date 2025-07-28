import {
  CSSProperties,
  FC,
  InputHTMLAttributes,
  ReactNode,
  SVGProps,
} from 'react';

// global components

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

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  placeholderText: string;
  disabled?: boolean;
  readOnly?: boolean;
  errorText?: string;
  id?: string;
};

export interface NumpadProps {
  onChange?: (value: string) => void;
  errorText?: string;
  inputLimit?: number;
  defaultInput?: string;
  inputPlaceholderText?: string;
}

export type IconProps = SVGProps<SVGSVGElement>;

// modals

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  style?: CSSProperties;
  footer?: ReactNode;
}

export interface PinCodeModalProps {
  open: boolean;
  onClose: () => void;
  handleSubmit: () => void;
}

export interface ServiceModalProps {
  open: boolean;
  onClose: () => void;
  handleHomeClick: () => void;
  handlePinClick: () => void;
}

// left section

export interface MetricsCardProps {
  title: string;
  metricContents: {
    text: string;
    highlighted?: boolean;
  }[];
  icon: FC<IconProps>;
}

export interface BreadCrumbItemType {
  label: string;
  href: string;
}

// middle section

export interface MiddleContentProps {
  top: { titleProps: MixColorsTextProps; subtitleProps: MixColorsTextProps };
  bottom: { textProps: MixColorsTextProps; buttonProps: ButtonProps };
}

// right section

export interface LeaderBoardData {
  rank: number;
  city: string;
  homesSolarized: string;
  isLastRow?: boolean;
}
