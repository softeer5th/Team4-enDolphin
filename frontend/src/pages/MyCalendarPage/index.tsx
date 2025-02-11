import { Calendar } from '@/components/Calendar';
import { SharedCalendarContext } from '@/components/Calendar/context/SharedCalendarContext';
import DatePicker from '@/components/DatePicker';
import { Divider } from '@/components/Divider';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { useMonthNavigation } from '@/hooks/useDatePicker/useMonthNavigation';
import { useSharedCalendar } from '@/hooks/useSharedCalendar';

import { calendarStyle, pickerStyle, sideBarStyle, titleContainerStyle } from './index.css';

const MyCalendarPage = () => {
  const calendar = useSharedCalendar();
  const monthNavigation = useMonthNavigation();

  return (
    <>
      <Flex className={titleContainerStyle} justify='flex-start'>
        <Text typo='h2'>내 일정 관리</Text>
      </Flex>
      <Divider />
      <Flex width='100%'>
        <SharedCalendarContext.Provider value={calendar}>
          <Flex
            className={sideBarStyle}
            direction='column'
            height='100vh'
            justify='flex-start'
            width='17.75rem'
          >
            <DatePicker.Select
              className={pickerStyle}
              handleDateSelect={calendar.handleSelectDate}
              selectedDate={calendar.selectedDate}
              {...monthNavigation}
            />
            <div>조율 중인 일정</div>
          </Flex>
          <Calendar {...calendar} className={calendarStyle} />
        </SharedCalendarContext.Provider>
      </Flex>
    </>
  );
};

export default MyCalendarPage;