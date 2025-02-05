import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { PropsWithChildren  } from 'react';

import { vars } from '@/theme/index.css';
import clsx from '@/utils/clsx';

import { flexStyle, flexVars } from './flex.css';

interface FlexProps extends PropsWithChildren {
  width?: number | string | 'full';
  height?: number | string;
  direction?: 'row' | 'column';
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  align?: 'center' | 'flex-start' | 'flex-end';
  gap?: keyof typeof vars.spacing;
  className?: string;
}

export const Flex = ({ className, children, ...styles }: FlexProps) => {
  const { 
    width = 'auto',
    height = 'auto',
    direction = 'row', 
    justify = 'center',
    align = 'flex-start',
    gap,
  } = styles;

  const formattedWidth = (()=>{
    if (width === 'full') return '100%';
    if (typeof width === 'number') return `${width}px`;
    return width;
  })();

  return (
    <div
      className={clsx(className, flexStyle)}
      style={assignInlineVars(flexVars, { 
        flex: { 
          width: formattedWidth,
          height: typeof height === 'number' ? `${height}px` : height,
          direction,
          justify,
          align,
          gap: gap ? vars.spacing[gap] : '0',
        },
      })}
    >
      {children}
    </div>
  );
};