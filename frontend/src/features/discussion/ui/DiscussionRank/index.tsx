import { useParams } from '@tanstack/react-router';

import SegmentControl from '@/components/SegmentControl';

import { useDiscussionRankQuery } from '../../api/queries';
import { segmentControlContentsStyle, segmentControlStyle } from './index.css';
import { RankContents } from './RankContents';

const segmentOptions = [
  { label: '참가자 많은 순', value: 'participant' },
  { label: '빠른 시간 순', value: 'time' },
];
const DiscussionRank = () => {
  const params: { id: string } = useParams({ from: '/_main/discussion/$id' });
  const { rank, isLoading } 
    = useDiscussionRankQuery(params.id, { selectedUserIdList: [1] });

  return (
    <SegmentControl
      className={segmentControlStyle}
      defaultValue='참가자 많은 순'
      segmentOptions={segmentOptions}
      style='weak'
    >
      <SegmentControl.Content className={segmentControlContentsStyle} value='참가자 많은 순'>
        {!isLoading && <RankContents data={rank?.eventsRankedDefault || []} />}
      </SegmentControl.Content>
      <SegmentControl.Content className={segmentControlContentsStyle} value='빠른 시간 순'>
        {!isLoading && <RankContents data={rank?.eventsRankedOfTime || []} />}
      </SegmentControl.Content>
    </SegmentControl>
  );
};

export default DiscussionRank;