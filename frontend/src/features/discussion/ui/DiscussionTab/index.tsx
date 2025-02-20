import { useState } from 'react';

import { Tab } from '@/components/Tab';

import DiscussionCalendar from '../DiscussionCalendar';
import DiscussionRank from '../DiscussionRank';
import { tabContainerStyle, tabContentStyle, tabListStyle } from './index.css';

const DiscussionTab = () => {
  const [tab, setTab] = useState('calendar');
  const handleChange = (value: string) => {
    setTab(value);
  };

  return (
    <Tab
      className={tabContainerStyle}
      onChange={handleChange}
      selectedValue={tab}
    >
      <Tab.List className={tabListStyle}>
        <Tab.Item value='calendar'>캘린더로 보기</Tab.Item>
        <Tab.Item value='rank'>순위로 보기</Tab.Item>
      </Tab.List>
      <Tab.Content className={tabContentStyle} value='calendar'>
        <DiscussionCalendar />
      </Tab.Content>
      <Tab.Content className={tabContentStyle} value='rank'>
        <DiscussionRank />
      </Tab.Content>
    </Tab>
  );
};

export default DiscussionTab;