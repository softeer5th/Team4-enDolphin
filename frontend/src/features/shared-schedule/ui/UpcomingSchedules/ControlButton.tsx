import { Flex } from '@/components/Flex';
import { ChevronLeft, ChevronRight } from '@/components/Icon';
import { vars } from '@/theme/index.css';

import { controlButtonStyle } from './index.css';

const ControlButtons = ({ 
  translateCarousel, 
  canTranslateLeft,
  canTranslateRight,
}: {
  translateCarousel: (direction: 'left' | 'right') => void;
  canTranslateLeft: boolean;
  canTranslateRight: boolean;
}) => (
  <Flex
    align='center'
    gap={400}
    justify='flex-end'
    width='full'
  >
    <LeftControlButton
      isAvailable={canTranslateLeft}
      onClick={() => translateCarousel('left')}
    />
    <RightControlButton
      isAvailable={canTranslateRight}
      onClick={() => translateCarousel('right')}
    />
  </Flex>
);

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

export default ControlButtons;