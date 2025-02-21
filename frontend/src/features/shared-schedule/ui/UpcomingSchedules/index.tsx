
import { Flex } from '@/components/Flex';
import { useCarouselControl } from '@/hooks/useCarousel';

import type { UpcomingSchedule } from '../../model';
import ControlButtons from './ControlButton';
import UpcomingCarousel from './UpcomingCarousel';

const UpcomingSchedules = ({ schedules }: {
  schedules: UpcomingSchedule[];
}) => {
  const { offsetX, translateCarousel, canTranslateLeft, canTranslateRight } = useCarouselControl({ 
    totalCards: schedules.length,
  });

  return (
    // 최상단 Flex에 relative 주면 안 됨! (overflow hidden 때문에 뷰포트가 부모여야 함)
    <Flex
      direction='column'
      gap={700}
      height={380}
      justify='flex-end'
      width='full'
    > 
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