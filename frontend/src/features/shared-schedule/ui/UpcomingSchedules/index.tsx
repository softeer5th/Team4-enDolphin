import { useNavigate } from '@tanstack/react-router';
import { useRef } from 'react';

import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { useCarouselControl } from '@/hooks/useCarousel';

import { LeftControlButton, RightControlButton } from './ControlButton';
import { containerStyle } from './index.css';
import UpcomingCarousel from './UpcomingCarousel';

interface UpcomingSchedulesProps {
  schedules: object[];
}

const UpcomingSchedules = ({ schedules }: UpcomingSchedulesProps) => {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);
  const { offsetX, translateCarousel } = useCarouselControl({ trackRef });
  return (
    <Flex
      className={containerStyle}
      direction='column'
      gap={700}
      height={448}
      justify='space-between'
      width='full'
    > 
      <UpcomingCarousel
        offsetX={offsetX}
        schedules={schedules}
        trackRef={trackRef}
      />
      <Flex justify='space-between' width='full'>
        <Text typo='h2'>다가오는 일정</Text>
        <Button 
          onClick={() => navigate({ to: '/upcoming-schedule' })} 
          style='borderless'
        >
          모두보기
        </Button>
      </Flex>
      <ControlButtons translateCarousel={translateCarousel} />
    </Flex>
  );
};

const ControlButtons = ({ translateCarousel }: {
  translateCarousel: (direction: 'left' | 'right') => void;
}) => (
  <Flex
    align='center'
    gap={400}
    justify='flex-end'
    width='full'
  >
    <LeftControlButton
      isAvailable={true}
      translateCarousel={translateCarousel}
    />
    <RightControlButton
      isAvailable={true}
      translateCarousel={translateCarousel}
    />
  </Flex>
);

export default UpcomingSchedules;