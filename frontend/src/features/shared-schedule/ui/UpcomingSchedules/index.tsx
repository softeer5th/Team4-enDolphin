import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { ChevronLeft, ChevronRight } from '@/components/Icon';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import ScheduleCard from '../ScheduleCard';
import { cardContainerStyle, containerStyle, controlButtonStyle } from './index.css';
import ScheduleCardContainer from './ScheduleCardContainer';

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
        <div className={cardContainerStyle}>
          <ScheduleCard selected={true} />
          <ScheduleCard selected={false} />
          <ScheduleCard selected={false} />
          <ScheduleCard selected={false} />
          <ScheduleCard selected={false} />
        </div>
        <Text typo='h2'>다가오는 일정</Text>
        <Button style='borderless'>모두보기</Button>
      </Flex>
      <Flex
        align='center'
        gap={400}
        justify='flex-end'
        width='full'
      >
        <button className={controlButtonStyle({ available: tempFlag })}>
          <ChevronLeft clickable={tempFlag} fill={vars.color.Ref.Netural[600]} />
        </button>
        <button className={controlButtonStyle({ available: tempFlag })}>
          <ChevronRight clickable={tempFlag} fill={vars.color.Ref.Netural[600]} />
        </button>
      </Flex>
    </Flex>
  );
};

export default UpcomingSchedules;