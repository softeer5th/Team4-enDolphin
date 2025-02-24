import { Flex } from '@/components/Flex';
import { Calendar } from '@/components/Icon';

import type { DiscussionDTO } from '../../model';
import DiscussionCard from '../DiscussionCard';
import { calendarWrapperStyle, rankContainerStyle, rankTopStyle } from './index.css';
import { RankTable } from './RankTable';

export const RankContents = ({ data }: { data: DiscussionDTO[] }) => {
  const TOP_CARD_NUM = 3;
  return (
    <Flex
      className={rankContainerStyle}
      direction='column'
      gap={400}
      width='100%'
    >
      <Flex
        className={rankTopStyle}
        gap={200}
        width='100%'
      >
        {data.slice(0, TOP_CARD_NUM).map((discussion, idx) => 
          <DiscussionCard
            discussion={discussion}
            key={`${discussion.endDateTime}-${idx}`}
            rank={idx + 1}
            size='lg'
          />)}
        <div className={calendarWrapperStyle}>
          <Calendar height={120} width={120} />
        </div>
      </Flex>
      <RankTable data={data.slice(TOP_CARD_NUM)} />
    </Flex>
  );
};