import { ReactElement, ReactNode, SVGProps } from 'react';

export interface ReactQueryProviderProps {
  children: ReactNode;
}

export type IconProps = SVGProps<SVGSVGElement>;

export interface MetricContentProps {
  text: string;
  variant?: string;
}
export interface StyledMetricsTextProps {
  metricContents: MetricContentProps[];
}

export interface MetricsCardProps {
  title: string;
  metricContents: MetricContentProps[];
  icon: ReactElement<IconProps>;
}
