import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import CarouselControlButton from '@/features/shared-schedule/ui/UpcomingSchedules/ControlButton';
import UpcomingCarousel from '@/features/shared-schedule/ui/UpcomingSchedules/UpcomingCarousel';

import { containerStyle } from './index.css';

const UpcomingSchedulePage = () => {
  const schedules = [{}, {}, {}, {}, {}];
  return (
    <Flex
      className={containerStyle}
      direction='column'
      gap={700}
    > 
      <Flex
        direction='column'
        height={448}
        justify='space-between'
        width='full'
      >
        <UpcomingCarousel schedules={schedules} />
        <Flex justify='space-between' width='full'>
          <Text typo='h2'>다가오는 일정</Text>
        </Flex>
        <Flex
          align='center'
          gap={400}
          justify='flex-end'
          width='full'
        >
          <CarouselControlButton direction='left' isAvailable={true} />
          <CarouselControlButton direction='right' isAvailable={true} />
        </Flex>
      </Flex>
    </Flex>
  );

};

export default UpcomingSchedulePage;