import type { PropsWithChildren } from 'react';

import { vars } from '../../theme/index.css';
import {
  tooltipContainerStyle,
  tooltipContentStyle,
} from './index.css';
import { TooltipArrowDown } from './TooltipArrowDown';
import { TooltipArrowLeft } from './TooltipArrowLeft';
import { TooltipArrowRight } from './TooltipArrowRight';
import { TooltipArrowUp } from './TooltipArrowUp';

interface TooltipProps extends PropsWithChildren {
  tailDirection: 'up' | 'down' | 'left' | 'right';
  color: 'blue' | 'black';
  isVisible?: boolean;
}

const Tooltip = ({ tailDirection, color = 'blue', isVisible = true, children }: TooltipProps) => {
  const colorMap = {
    blue: vars.color.Ref.Primary[50],
    black: vars.color.Ref.Netural[800],
  };
  return (
    <div className={tooltipContainerStyle({ tailDirection })}>
      { tailDirection === 'up' &&
      <TooltipArrowUp fill={colorMap[color]} />
      }
      { tailDirection === 'left' &&
      <TooltipArrowLeft fill={colorMap[color]} />
      }
      <div className={tooltipContentStyle({ color })}>
        {children}
      </div>
      { tailDirection === 'down' &&
      <TooltipArrowDown fill={colorMap[color]} />
      }
      { tailDirection === 'right' &&
      <TooltipArrowRight fill={colorMap[color]}/>
      }
    </div>
  );
};

export default Tooltip;
