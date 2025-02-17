import SegmentControl from '@/components/SegmentControl';

import type { DiscussionDTO } from '../../model';
import { segmentControlStyle } from './index.css';
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

const DiscussionRank = () => (
  <SegmentControl
    className={segmentControlStyle}
    defaultValue='참가자 많은 순'
    style='weak'
    values={['참가자 많은 순', '빠른 시간 순']}
  >
    <SegmentControl.Content value='참가자 많은 순'>
      <RankContents data={data} />
    </SegmentControl.Content>
    <SegmentControl.Content value='빠른 시간 순'>
      <RankContents data={data} />
    </SegmentControl.Content>
  </SegmentControl>
);

export default DiscussionRank;