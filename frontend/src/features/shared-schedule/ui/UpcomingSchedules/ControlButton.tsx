import { ChevronLeft, ChevronRight } from '@/components/Icon';
import { vars } from '@/theme/index.css';

import { controlButtonStyle } from './index.css';

interface ControlButtonProps {
  isAvailable: boolean;
  translateCarousel: (direction: 'left' | 'right') => void;
}

export const LeftControlButton = ({ isAvailable, translateCarousel }: ControlButtonProps) => (
  <button
    className={controlButtonStyle({ available: isAvailable })}
    onClick={() => translateCarousel('left')}
  >
    <ChevronLeft
      clickable={isAvailable}
      fill={vars.color.Ref.Netural[600]}
    />
  </button>
);

export const RightControlButton = ({ isAvailable, translateCarousel }: ControlButtonProps) => (
  <button
    className={controlButtonStyle({ available: isAvailable })} 
    onClick={() => translateCarousel('right')}
  >
    <ChevronRight
      clickable={isAvailable}
      fill={vars.color.Ref.Netural[600]}
    />
  </button>
);