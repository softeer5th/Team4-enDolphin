import { useNavigate } from '@tanstack/react-router';

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
      <UpcomingCarousel
        offsetX={offsetX}
        schedules={schedules}
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
      <ControlButtons 
        canTranslateLeft={canTranslateLeft} 
        canTranslateRight={canTranslateRight} 
        translateCarousel={translateCarousel}
      />
    </Flex>
  );
};

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

export default UpcomingSchedules;