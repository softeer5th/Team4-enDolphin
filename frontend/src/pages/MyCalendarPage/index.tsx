import { SharedCalendarContext } from '@/components/Calendar/context/SharedCalendarContext';
import { Divider } from '@/components/Divider';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { MyCalendar } from '@/features/my-calendar/ui/MyCalendar';
import { MyDatePicker } from '@/features/my-calendar/ui/MyDatePicker';
import { useSharedCalendar } from '@/hooks/useSharedCalendar';

import { 
  containerStyle, 
  contentStyle, 
  sideBarStyle, 
  titleContainerStyle, 
} from './index.css';

const MyCalendarPage = () => {
  const calendar = useSharedCalendar();

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
            <MyDatePicker />
            <Divider />
          </Flex>
          <MyCalendar />
        </SharedCalendarContext.Provider>
      </Flex>
    </div>
  );
};

export default MyCalendarPage;