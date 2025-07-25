import { FC, ReactNode, SVGProps } from 'react';

export interface ReactQueryProviderProps {
  children: ReactNode;
}

export type IconProps = SVGProps<SVGSVGElement>;

export interface MetricContentProps {
  text: string;
  highlighted?: boolean;
}
export interface StyledMetricsTextProps {
  metricContents: MetricContentProps[];
}

export interface MetricsCardProps {
  title: string;
  metricContents: MetricContentProps[];
  icon: FC<IconProps>;
}

export interface LeaderBoardData {
  rank: number;
  city: string;
  homesSolarized: string;
}
