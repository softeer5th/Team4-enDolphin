import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { ChevronLeft, ChevronRight } from '@/components/Icon';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import ScheduleCard from '../ScheduleCard';
import { controlButtonStyle } from './index.css';

interface UpcomingSchedulesProps {
  schedules: object[];
}

const UpcomingSchedules = ({ schedules }: UpcomingSchedulesProps) => (
  <Flex direction='column' gap={700}> 
    <Flex align='center' justify='space-between'>
      <Text typo='h2'>다가오는 일정</Text>
      <Button style='borderless'>모두보기</Button>
    </Flex>
    <Flex align='center' gap={600}>
      <ScheduleCard selected={true} />
      <ScheduleCard selected={false} />
      <ScheduleCard selected={false} />
    </Flex>
    <Flex
      align='center'
      gap={400}
      justify='flex-end'
    >
      <button className={controlButtonStyle({ available: false })}>
        <ChevronLeft color={vars.color.Ref.Netural[600]} />
      </button>
      <button className={controlButtonStyle({ available: false })}>
        <ChevronRight color={vars.color.Ref.Netural[600]} />
      </button>
    </Flex>
  </Flex>
);

export default UpcomingSchedules;