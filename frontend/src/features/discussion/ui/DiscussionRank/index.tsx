import { useState } from 'react';

import { Flex } from '@/components/Flex';
import { Tab } from '@/components/Tab';

import type { DiscussionDTO } from '../../model';
import { tabStyle } from './index.css';
import { RankContents } from './RankContents';

const data: DiscussionDTO[] = [
  {
    startDateTime: new Date('2025-02-16'),
    endDateTime: new Date('2025-02-17'),
    usersForAdjust: [],
  },
  {
    startDateTime: new Date('2025-02-20'),
    endDateTime: new Date('2025-02-21'),
    usersForAdjust: [
      {
        id: 1,
        name: '이현영', 
      },
      {
        id: 2,
        name: '이재영',
      },
    ],
  },
  {
    startDateTime: new Date('2025-02-16'),
    endDateTime: new Date('2025-02-17'),
    usersForAdjust: [
      {
        id: 3,
        name: '김동권', 
      },
      {
        id: 4,
        name: '김동현',
      },
    ],
  },
  {
    startDateTime: new Date('2025-02-16'),
    endDateTime: new Date('2025-02-17'),
    usersForAdjust: [
      {
        id: 3,
        name: '김동권', 
      },
      {
        id: 4,
        name: '김동현',
      },
    ],
  },
];

const DiscussionRank = () => {
  const [tab, setTab] = useState('eventsRankedDefault');
  const handleChange = (value: string) => {
    setTab(value);
  };

  return (
    <Tab
      className={tabStyle}
      onChange={handleChange}
      selectedValue={tab}
    >
      <Tab.List>
        <Tab.Item value='eventsRankedDefault'>참가자 많은 순</Tab.Item>
        <Tab.Item value='eventsRankedOfTime'>빠른 시간 순</Tab.Item>
      </Tab.List>
      <Tab.Content value='eventsRankedDefault'>
        <RankContents data={data} />
      </Tab.Content>
      <Tab.Content value='eventsRankedOfTime'>
        <RankContents data={data} />
      </Tab.Content>
    </Tab>
  );
};

export default DiscussionRank;