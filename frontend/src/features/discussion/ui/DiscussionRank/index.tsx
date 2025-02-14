import { useState } from 'react';

import { Tab } from '@/components/Tab';

const DiscussionRank = () => {
  const [tab, setTab] = useState('eventsRankedDefault');
  const handleChange = (value: string) => {
    setTab(value);
  };

  return (
    <div>
      <Tab onChange={handleChange} selectedValue={tab}>
        <Tab.List>
          <Tab.Item value='eventsRankedDefault'>참가자 많은 순</Tab.Item>
          <Tab.Item value='eventsRankedOfTime'>빠른 시간 순</Tab.Item>
        </Tab.List>
        <Tab.Content value='eventsRankedDefault'>캘린더</Tab.Content>
        <Tab.Content value='eventsRankedOfTime'>순위</Tab.Content>
      </Tab>
    </div>
  );
};

export default DiscussionRank;