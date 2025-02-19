import { Flex } from '@/components/Flex';

import type { Participant, ScheduleEvent } from '../../model';
import { calculateBlockStyle } from '../timelineHelper';
import {
  timelineBlockContainerStyle,
  timelineBlockRowStyle,
  timelineBlockStyle,
} from './index.css';

const TimelineBlocks = ({ participants, gridStart }: {
  participants: Participant[];
  gridStart: Date;
}) => (
  <Flex
    className={timelineBlockContainerStyle}
    direction='column'
  >
    {participants.map((participant) => (
      <div
        className={timelineBlockRowStyle}
        key={participant.id}
      >
        {participant.events.map((event, index) => (
          <TimelineBlock
            event={event}
            gridStart={gridStart}
            key={index}
          />
        ))}
      </div>
    ))}
  </Flex>
);

const TimelineBlock = ({ gridStart, event }: {
  gridStart: Date;
  event: ScheduleEvent;
}) => {
  const { left, width } = calculateBlockStyle(gridStart, event.startDateTime, event.endDateTime);
  return (
    <div
      className={timelineBlockStyle({ status: event.status })}
      style={{
        left: `${left}px`,
        width: `${width}px`,
      }}
    />
  );
};

export default TimelineBlocks;