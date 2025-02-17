import { Link } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import { Flex } from '@/components/Flex';
import { useCarouselControl } from '@/hooks/useCarousel';

import ControlButtons from './ControlButton';
import { containerStyle } from './index.css';
import UpcomingCarousel from './UpcomingCarousel';

interface UpcomingSchedulesProps extends PropsWithChildren {
  schedules: object[];
}

const UpcomingSchedules = ({ schedules, children }: UpcomingSchedulesProps) => {
  const { offsetX, translateCarousel, canTranslateLeft, canTranslateRight } = useCarouselControl({ 
    totalCards: schedules.length,
  });
  return (
    <Flex
      className={containerStyle}
      direction='column'
      gap={700}
      height={448}
      justify='space-between'
      width='full'
    > 
      <Flex justify='space-between' width='full'>
        {children}
      </Flex>
      <UpcomingCarousel
        offsetX={offsetX}
        schedules={schedules}
      />
      <ControlButtons
        canTranslateLeft={canTranslateLeft} 
        canTranslateRight={canTranslateRight} 
        translateCarousel={translateCarousel}
      />
    </Flex>
  );
};

export default UpcomingSchedules;