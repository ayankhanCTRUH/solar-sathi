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

export interface ShowErrorProps {
  title: string;
  description: string;
  className?: string;
}

export interface EmptyDataProps {
  content: string;
  className?: string;
}

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
  metricContents?: {
    text: string;
    highlighted?: boolean;
  }[];
  icon: FC<IconProps>;
}

export interface BreadCrumbItemType {
  label: string;
  key: string;
  onClick?: () => void;
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

// api response

interface StrapiImageType {
  formats: {
    small: { url: string };
  };
}

export interface TestimonialAPIType {
  id: number;
  name: string;
  address: string;
  description: string;
  installedOn: string;
  image: StrapiImageType;
}

export type TestimonialType = Omit<TestimonialAPIType, 'image'> & {
  image: string;
};

// map section

export interface MapDataType {
  [stateName: string]: {
    total_count: number;
    cities: Record<
      string,
      {
        count: number;
        active_pincode: string[];
      }
    >;
  };
}

export interface PincodeDataType {
  pincode: number;
  city: string;
  state: string;
  coordinates: [number, number];
}

export interface MapDataStateType {
  // home section
  isHomePage: boolean;
  setIsHomePage: (data: boolean) => void;
  // map section
  mapData: MapDataType;
  setMapData: (data: MapDataType) => void;
  pincodeData: PincodeDataType[];
  setPincodeData: (data: PincodeDataType[]) => void;
}

export interface StateDataType {
  [state: string]: {
    value: number;
    latLng: [number, number];
  };
}

export interface LayerData {
  feature: {
    properties: {
      ST_NM: string;
    };
  };
}

export type ExpCenterBodyType =
  | object
  | { state: string }
  | { state: string; city: string }
  | { pincode: string };
