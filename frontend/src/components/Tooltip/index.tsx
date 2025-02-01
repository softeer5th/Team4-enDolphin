import type { PropsWithChildren } from 'react';

import {
  ToolTipArrowContainerStyle,
  TooltipContainerStyle, 
  TooltipContentStyle, 
} from './index.css';
import { RoundedTriangle } from './RoundedTriangle';

interface TooltipProps extends PropsWithChildren {
  arrowPlacement: 'top' | 'bottom' | 'left' | 'right';
  color: 'blue' | 'black';
  isVisible?: boolean;
}

const Tooltip = ({ arrowPlacement, color, isVisible = true, children }: TooltipProps) => (
  <div className={TooltipContainerStyle}>
    {isVisible && (
      <div className={TooltipContentStyle({ arrowPlacement, color })}>
        {children}
        <div className={ToolTipArrowContainerStyle}>
          <RoundedTriangle color='black' direction='left' />
        </div>
        {/* <div className={TooltipArrow({ arrowPlacement, color })} /> */}
      </div>
    )}
  </div>
);

export default Tooltip;
