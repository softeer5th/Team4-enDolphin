import { useNavigate } from '@tanstack/react-router';

import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { useCarouselControl } from '@/hooks/useCarousel';

import CarouselControlButton from './ControlButton';
import { containerStyle } from './index.css';
import UpcomingCarousel from './UpcomingCarousel';

interface UpcomingSchedulesProps {
  schedules: object[];
}

const UpcomingSchedules = ({ schedules }: UpcomingSchedulesProps) => {
  const navigate = useNavigate();
  const offsetX = 0;
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
        <UpcomingCarousel offsetX={offsetX} schedules={schedules} />
        <Flex justify='space-between' width='full'>
          <Text typo='h2'>다가오는 일정</Text>
          <Button 
            onClick={() => navigate({ to: '/upcoming-schedule' })} 
            style='borderless'
          >
            모두보기
          </Button>
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

export default UpcomingSchedules;