import { Calendar } from '@/components/Calendar';
import { SharedCalendarContext } from '@/components/Calendar/context/SharedCalendarContext';
import DatePicker from '@/components/DatePicker';
import { Divider } from '@/components/Divider';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { useMonthNavigation } from '@/hooks/useDatePicker/useMonthNavigation';
import { useSharedCalendar } from '@/hooks/useSharedCalendar';

import { titleContainerStyle } from './index.css';

const MyCalendarPage = () => {
  const calendar = useSharedCalendar();
  const monthNavigation = useMonthNavigation();

  return (
    <>
      <Flex className={titleContainerStyle} justify='flex-start'>
        <Text typo='h2'>내 일정 관리</Text>
      </Flex>
      <Divider />
      <SharedCalendarContext.Provider value={calendar}>
        <Flex>
          <DatePicker.Select
            handleDateSelect={calendar.handleSelectDate}
            selectedDate={calendar.selectedDate}
            {...monthNavigation}
          />
          <Calendar {...calendar} />
        </Flex>
      </SharedCalendarContext.Provider>
    </>
  );
};

export default MyCalendarPage;