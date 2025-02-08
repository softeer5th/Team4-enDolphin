import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';

import ScheduleCard from '../ScheduleCard';
import CarouselControlButton from './ControlButton';
import { CarouselStyle, containerStyle } from './index.css';

interface UpcomingSchedulesProps {
  schedules: object[];
}

const UpcomingSchedules = ({ schedules }: UpcomingSchedulesProps) => {
  const tempFlag = true;
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
        <div className={CarouselStyle}>
          <ScheduleCard selected={true} />
          <ScheduleCard selected={false} />
          <ScheduleCard selected={false} />
          <ScheduleCard selected={false} />
          <ScheduleCard selected={false} />
        </div>
        <Flex justify='space-between' width='full'>
          <Text typo='h2'>다가오는 일정</Text>
          <Button style='borderless'>모두보기</Button>
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