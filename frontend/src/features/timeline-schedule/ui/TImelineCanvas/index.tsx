import { Flex } from '@/components/Flex';

import type { Participant } from '../../model';
import ConflictRangeBox from './ConflictRangeBox';
import { timelineCanvasStyle } from './index.css';
import TimelineBlocks from './TimelineBlocks';
import TimelineColumns from './TimelineColumns';

const TimelineCanvas = ({ gridTimes, conflictStart, conflictEnd, participants, gridStartOffset }: {
  gridTimes: Date[];
  participants: Participant[];
  conflictStart: Date;
  conflictEnd: Date;
  gridStartOffset: number;
}) => (
  <Flex
    className={timelineCanvasStyle}
  >
    <div style={{ position: 'relative', left: `${gridStartOffset}px` }}> 
      <TimelineColumns
        conflictEnd={conflictEnd}
        conflictStart={conflictStart}
        gridTimes={gridTimes}
      />
      <TimelineBlocks
        gridStart={gridTimes[0]}
        participants={participants}
      />
    </div>
    <ConflictRangeBox
      conflictTimeEnd={conflictEnd}
      conflictTimeStart={conflictStart}
      gridStart={gridTimes[0]}
    />
  </Flex>
);

export default TimelineCanvas;