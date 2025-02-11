import { Calendar } from '@/components/Calendar';
import { SharedCalendarContext } from '@/components/Calendar/context/SharedCalendarContext';
import DatePicker from '@/components/DatePicker';
import { Divider } from '@/components/Divider';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { useMonthNavigation } from '@/hooks/useDatePicker/useMonthNavigation';
import { useSharedCalendar } from '@/hooks/useSharedCalendar';

import { 
  calendarStyle, 
  containerStyle, 
  contentStyle, 
  pickerStyle, 
  sideBarStyle, 
  titleContainerStyle, 
} from './index.css';

const MyCalendarPage = () => {
  const calendar = useSharedCalendar();
  const monthNavigation = useMonthNavigation();

  return (
    <div className={containerStyle}>
      <Flex className={titleContainerStyle} justify='flex-start'>
        <Text typo='h2'>내 일정 관리</Text>
      </Flex>
      <Divider />
      <Flex className={contentStyle} width='100%'>
        <SharedCalendarContext.Provider value={calendar}>
          <Flex
            className={sideBarStyle}
            direction='column'
            gap={400}
            justify='flex-start'
            width='17.75rem'
          >
            <DatePicker.Select
              className={pickerStyle}
              handleDateSelect={calendar.handleSelectDate}
              selectedDate={calendar.selectedDate}
              {...monthNavigation}
            />
            <Divider />
          </Flex>
          <Calendar
            {...calendar}
            className={calendarStyle}
          />
        </SharedCalendarContext.Provider>
      </Flex>
    </div>
  );
};

export default MyCalendarPage;