import { useState } from 'react';

import { Tab } from '@/components/Tab';

import type { DiscussionDTO } from '../../model';
import { Participants } from './Participants';

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
    <div>
      <Tab onChange={handleChange} selectedValue={tab}>
        <Tab.List>
          <Tab.Item value='eventsRankedDefault'>참가자 많은 순</Tab.Item>
          <Tab.Item value='eventsRankedOfTime'>빠른 시간 순</Tab.Item>
        </Tab.List>
        <Tab.Content value='eventsRankedDefault'>
          <Participants data={data} />
        </Tab.Content>
        <Tab.Content value='eventsRankedOfTime'>순위</Tab.Content>
      </Tab>
    </div>
  );
};

export default DiscussionRank;