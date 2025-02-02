import type { PropsWithChildren } from 'react';

import type { TooltipProps } from '.';
import { contentContainerStyle } from './index.css';

interface TooltipContentProps extends PropsWithChildren {
  color: TooltipProps['color'];
  button: TooltipProps['button'];
}

const TooltipContent = ({ color, button, children }: TooltipContentProps) => {

  if (button) 
    return (
      <div className={contentContainerStyle({ color })}>
        {children}
      </div>

    );

  return (
    <div className={contentContainerStyle({ color })}>
      {children}
    </div>
  );
};

export default TooltipContent;