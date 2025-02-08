import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';

import ScheduleList from '../ScheduleList';

const ExpiredSchedules = () => {
  const schedules = {};
  return (
    <Flex
      // className={containerStyle}
      direction='column'
      justify='flex-start'
      width='full'
    >
      <Flex>
        <Text typo='h2'>지난 일정</Text>

      </Flex>
      <ScheduleList schedule={schedules} />
    </Flex>
  );
};

export default ExpiredSchedules;
