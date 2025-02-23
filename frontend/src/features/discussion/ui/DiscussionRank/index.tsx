import { useParams } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';

import SegmentControl from '@/components/SegmentControl';
import { checkboxAtom } from '@/store/discussion';

import { useDiscussionRankQuery } from '../../api/queries';
import { segmentControlContentsStyle, segmentControlStyle } from './index.css';
import { RankContents } from './RankContents';

const DiscussionRank = () => {
  const params: { id: string } = useParams({ from: '/_main/discussion/$id' });
  const checkedList = useAtomValue(checkboxAtom);
  const { rank, isLoading } 
    = useDiscussionRankQuery(params.id, { 
      selectedUserIdList: checkedList || null, 
    });

  const segmentOptions = [
    { label: '참가자 많은 순', value: 'participant' },
    { label: '빠른 시간 순', value: 'time' },
  ];

  return (
    <SegmentControl
      className={segmentControlStyle}
      defaultValue='participant'
      segmentOptions={segmentOptions}
      style='weak'
    >
      <SegmentControl.Content className={segmentControlContentsStyle} value='participant'>
        {!isLoading && <RankContents data={rank?.eventsRankedDefault || []} />}
      </SegmentControl.Content>
      <SegmentControl.Content className={segmentControlContentsStyle} value='time'>
        {!isLoading && <RankContents data={rank?.eventsRankedOfTime || []} />}
      </SegmentControl.Content>
    </SegmentControl>
  );
};

export default DiscussionRank;