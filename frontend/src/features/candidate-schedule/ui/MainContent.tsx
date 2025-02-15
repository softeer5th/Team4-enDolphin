import { Flex } from '@/components/Flex';

import type { Participant } from '../model';
import TimelineContent from './TimelineContent';

const MainContent = ({ participants, startTime, endTime }: { 
  participants: Participant[];
  startTime: Date;
  endTime: Date;
}) => (
  <Flex
    direction='column'
    gap={200}
    width='full'
  >
    <TimelineContent
      conflictEnd={endTime} 
      conflictStart={startTime}
      participants={participants}
    />
  </Flex>
);

export default MainContent;