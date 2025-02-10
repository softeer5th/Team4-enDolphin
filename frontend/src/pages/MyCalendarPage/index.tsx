import { Calendar } from '@/components/Calendar';
import DatePicker from '@/components/DatePicker';
import { Divider } from '@/components/Divider';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';

import { titleContainerStyle } from './index.css';

const MyCalendarPage = () => (
  <>
    <Flex className={titleContainerStyle} justify='flex-start'>
      <Text typo='h2'>내 일정 관리</Text>
    </Flex>
    <Divider />
    <DatePicker calendarType='select' />
    <Calendar />
  </>
);

export default MyCalendarPage;