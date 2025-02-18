import { useState } from 'react';

import { Flex } from '@/components/Flex';
import { ChevronLeft, ChevronRight } from '@/components/Icon';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import FinishedScheduleList from './FinishedScheduleList';

const FinishedSchedules = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
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
          {/* TODO: 연도 validation */}
          <ChevronLeft 
            clickable={true}
            fill={vars.color.Ref.Netural[400]} 
            onClick={() => setCurrentYear(currentYear - 1)}
          />
          <Text color={vars.color.Ref.Netural[700]} typo='b2M'>
            {`${currentYear}년`}
          </Text>
          <ChevronRight
            clickable={true}
            fill={vars.color.Ref.Netural[700]}
            onClick={() => setCurrentYear(currentYear + 1)}
          />
        </Flex>
      </Flex>
      <FinishedScheduleList baseYear={currentYear} />
    </Flex>
  );
};

export default FinishedSchedules;
