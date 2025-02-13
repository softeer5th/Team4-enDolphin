import { Flex } from '@/components/Flex';
import { ChevronLeft, ChevronRight } from '@/components/Icon';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import UnconfirmedScheduleList from '../UnConfirmedSchedules/UnconfirmedScheduleList';

const ExpiredSchedules = () => {
  const schedules = [{}, {}, {}];
  return (
    <Flex
      direction='column'
      gap={400}
      justify='flex-start'
      width='full'
    >
      <Flex direction='column' gap={300}>
        <Text typo='h2'>지난 일정</Text>
        <Flex gap={200}>
          <ChevronLeft clickable={false} fill={vars.color.Ref.Netural[400]} />
          <Text color={vars.color.Ref.Netural[700]} typo='b2M'>2024년</Text>
          <ChevronRight clickable={true} fill={vars.color.Ref.Netural[700]} />
        </Flex>
      </Flex>
      <UnconfirmedScheduleList schedules={schedules} />
    </Flex>
  );
};

export default ExpiredSchedules;
