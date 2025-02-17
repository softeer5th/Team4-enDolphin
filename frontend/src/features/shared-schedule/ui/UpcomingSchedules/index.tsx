import type { PropsWithChildren } from 'react';

import { Flex } from '@/components/Flex';
import { useCarouselControl } from '@/hooks/useCarousel';

import { useUpcomingQuery } from '../../api/queries';
import ControlButtons from './ControlButton';
import { containerStyle } from './index.css';
import UpcomingCarousel from './UpcomingCarousel';

const UpcomingSchedules = ({ children }: PropsWithChildren) => {
  const { data, isPending } = useUpcomingQuery();
  const schedules = data?.data ?? [];
  
  const { offsetX, translateCarousel, canTranslateLeft, canTranslateRight } = useCarouselControl({ 
    totalCards: schedules.length,
  });

  if (isPending) return <div>pending...</div>;
  if (!data || !data.data) return <div>No data available</div>;

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