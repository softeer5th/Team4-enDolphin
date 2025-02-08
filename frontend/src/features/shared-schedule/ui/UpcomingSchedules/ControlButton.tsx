import { ChevronLeft, ChevronRight } from '@/components/Icon';
import { vars } from '@/theme/index.css';

import { controlButtonStyle } from './index.css';

interface ControlButtonProps {
  direction: 'left' | 'right';
  isAvailable: boolean;
}

const CarouselControlButton = ({ direction, isAvailable }: ControlButtonProps) => 
  <button className={controlButtonStyle({ available: isAvailable })}>
    {
      direction === 'left' ?
        <ChevronLeft clickable={isAvailable} fill={vars.color.Ref.Netural[600]} />
        :
        <ChevronRight clickable={isAvailable} fill={vars.color.Ref.Netural[600]} />
    }
  </button>;

export default CarouselControlButton;