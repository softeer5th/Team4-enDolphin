import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';

import type { DiscussionDTO } from '../../model';
import { 
  tableBodyStyle,
  tableHeaderCellStyle,
  tableHeaderStyle,
  tableStyle, 
} from './index.css';
import { RankTableRow } from './RankTableRow';

export const RankTable = ({ data }: { data: DiscussionDTO[] }) => (
  <Flex
    as='table'
    className={tableStyle}
    direction='column'
    width='100%'
  >
    <thead className={tableHeaderStyle}>
      <Flex as='tr'>
        <th className={tableHeaderCellStyle({ width: 56 })}><Text typo='b3R'>순위</Text></th>
        <th className={tableHeaderCellStyle({ width: 'full' })}>
          <Text typo='b3R'>조정 필요 여부</Text>
        </th>
        <th className={tableHeaderCellStyle({ width: 158 })}><Text typo='b3R'>날짜</Text></th>
        <th className={tableHeaderCellStyle({ width: 158 })}><Text typo='b3R'>시간</Text></th>
      </Flex>
    </thead>
    <tbody className={tableBodyStyle}>
      {data.map((discussion, rank) => (
        <RankTableRow
          discussion={discussion}
          key={`${discussion.endDateTime}-${rank}`}
          rank={rank}
        />
      ))}
    </tbody>
  </Flex>
);