import { ReactNode } from 'react';

export interface BaseProps {
  children?: ReactNode;
  className?: string;
}

export interface BentoItemProps extends BaseProps {
  title: string;
  description: string;
  icon: ReactNode;
  colSpan?: 1 | 2 | 3;
}

export interface MagneticProps extends BaseProps {
  strength?: number;
}
