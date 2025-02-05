import type { HTMLAttributes } from 'react';

export interface IconProps extends HTMLAttributes<SVGSVGElement> {
  clickable?: boolean;
  className?: string;
  width?: number | string;
  fill?: string;
  stroke?: string;
}