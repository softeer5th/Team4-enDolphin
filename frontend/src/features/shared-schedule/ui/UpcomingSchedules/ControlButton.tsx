import { ChevronLeft, ChevronRight } from '@/components/Icon';
import { vars } from '@/theme/index.css';

import { controlButtonStyle } from './index.css';

interface ControlButtonProps {
  isAvailable: boolean;
  onClick: () => void;
}

export const LeftControlButton = ({ isAvailable, onClick }: ControlButtonProps) => (
  <button
    className={controlButtonStyle({ available: isAvailable })}
    disabled={!isAvailable}
    onClick={onClick}
  >
    <ChevronLeft
      clickable={isAvailable}
      fill={vars.color.Ref.Netural[600]}
    />
  </button>
);

export const RightControlButton = ({ isAvailable, onClick }: ControlButtonProps) => (
  <button
    className={controlButtonStyle({ available: isAvailable })}
    disabled={!isAvailable} 
    onClick={onClick}
  >
    <ChevronRight
      clickable={isAvailable}
      fill={vars.color.Ref.Netural[600]}
    />
  </button>
);