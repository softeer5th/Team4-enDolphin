import type { PropsWithChildren, ReactNode } from 'react';

import { vars } from '../../theme/index.css';
import { containerStyle } from './index.css';
import { TooltipArrowDown } from './TooltipArrowDown';
import { TooltipArrowLeft } from './TooltipArrowLeft';
import { TooltipArrowRight } from './TooltipArrowRight';
import { TooltipArrowUp } from './TooltipArrowUp';
import TooltipContent from './TooltipContent';

export interface TooltipProps extends PropsWithChildren {
  color: 'blue' | 'black';
  tailDirection: 'up' | 'down' | 'left' | 'right';
  button?: ReactNode;
}

const Tooltip = ({ tailDirection, color = 'blue', button, children }: TooltipProps) => {
  const colorMap = {
    blue: vars.color.Ref.Primary[50],
    black: vars.color.Ref.Netural[800],
  };
  return (
    <div className={containerStyle({ tailDirection })}>
      { tailDirection === 'up' && <TooltipArrowUp fill={colorMap[color]} /> }
      { tailDirection === 'left' && <TooltipArrowLeft fill={colorMap[color]} /> }
      <TooltipContent button={button} color={color}>
        {children}
      </TooltipContent>
      { tailDirection === 'down' && <TooltipArrowDown fill={colorMap[color]} /> }
      { tailDirection === 'right' && <TooltipArrowRight fill={colorMap[color]}/> }
    </div>
  );
};

export default Tooltip;
