import { useState } from 'react';

import { SharedCalendarContext } from '@/components/Calendar/context/SharedCalendarContext';
import { Divider } from '@/components/Divider';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { MyCalendar } from '@/features/my-calendar/ui/MyCalendar';
import SideBar from '@/features/my-calendar/ui/SideBar';
import { useSelectDateRange } from '@/hooks/useSelectDateRange';
import { useSharedCalendar } from '@/hooks/useSharedCalendar';

import { DiscussionContext } from './DiscussionContext';
import { 
  containerStyle, 
  contentStyle, 
  titleContainerStyle, 
} from './index.css';

const MyCalendarPage = () => {
  const calendar = useSharedCalendar();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className={containerStyle}>
      <Flex className={titleContainerStyle} justify='flex-start'>
        <Text typo='h2'>내 일정 관리</Text>
      </Flex>
      <Divider />
      <Flex className={contentStyle} width='100%'>
        <SharedCalendarContext.Provider value={calendar}>
          <DiscussionContext.Provider value={{
            selectedId,
            setSelectedId,
            ...useSelectDateRange(),
          }}
          >
            <SideBar />
            <MyCalendar />
          </DiscussionContext.Provider>
        </SharedCalendarContext.Provider>
      </Flex>
    </div>
  );
};

export default MyCalendarPage;