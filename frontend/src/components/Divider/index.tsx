import { assignInlineVars } from '@vanilla-extract/dynamic';

import { vars } from '@/theme/index.css';
import clsx from '@/utils/clsx';

import { dividerStyle, dividerVars } from './index.css';

type Width = number | string | 'full';

interface DividerProps {
  width?: Width;
  height?: number | string;
  color?: string;
  className?: string;
}

export const Divider = ({ 
  width = 'full', 
  height = 1, 
  color = vars.color.Ref.Netural[200], 
  className, 
}: DividerProps) => {
  const formatWidth = (width: Width) => {
    if (width === 'full') return '100%';
    if (typeof width === 'number') return `${width}px`;
    return width;
  };

  return (
    <div
      className={clsx(className, dividerStyle)}
      style={assignInlineVars(dividerVars, { 
        divider: { 
          width: formatWidth(width),
          height: typeof height === 'number' ? `${height}px` : height,
          color,
        },
      })}
    />
  );
};