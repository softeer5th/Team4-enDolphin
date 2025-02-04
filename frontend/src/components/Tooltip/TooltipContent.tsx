import type { MouseEventHandler, PropsWithChildren } from 'react';

import { Text } from '../Text';
import type { TooltipProps } from '.';
import { contentContainerStyle, tooltipButtonStyle } from './tooltipContent.css';

interface TooltipContentProps extends PropsWithChildren {
  color: TooltipProps['color'];
  button: TooltipProps['button'];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const TooltipContent = ({ color, button, onClick, children }: TooltipContentProps) => (
  button ?       
    <div className={contentContainerStyle({ buttonExists: true, color })}>
      <Text typo='b2R'>{children}</Text>
      <button className={tooltipButtonStyle} onClick={onClick}>
        <Text typo='t2'>{button}</Text>
      </button>
    </div>   
    :  
    <div className={contentContainerStyle({ buttonExists: false, color })}>
      <Text typo='t3'>{children}</Text>
    </div>
);

export default TooltipContent;