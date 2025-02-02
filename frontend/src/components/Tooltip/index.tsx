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
  arrowPlacement: 'top' | 'bottom' | 'left' | 'right';
  color: 'blue' | 'black';
  isVisible?: boolean;
}

const Tooltip = ({ arrowPlacement, color = 'blue', isVisible = true, children }: TooltipProps) => {
  const colorMap = {
    blue: vars.color.Ref.Primary[50],
    black: vars.color.Ref.Netural[800],
  };
  return (
    <div className={tooltipContainerStyle({ arrowPlacement })}>
      { arrowPlacement === 'top' &&
      <TooltipArrowUp fill={colorMap[color]} />
      }
      { arrowPlacement === 'left' &&
      <TooltipArrowLeft fill={colorMap[color]} />
      }
      <div className={tooltipContentStyle({ color })}>
        {children}
      </div>
      { arrowPlacement === 'bottom' &&
      <TooltipArrowDown fill={colorMap[color]} />
      }
      { arrowPlacement === 'right' &&
      <TooltipArrowRight fill={colorMap[color]}/>
      }
    </div>
  );
};

export default Tooltip;
