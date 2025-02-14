
import { Flex } from '@/components/Flex';
import Tooltip from '@/components/Tooltip';

import type { Participant, ScheduleEvent } from '../../model';
import { timelineHeaderStyle } from './mainContent.css';
import { 
  timelineBlockContainerStyle,
  timelineBlockRowStyle,
  timelineBlockStyle,
  timelineCanvasStyle,
  timelineCanvasWrapperStyle,
  timelineColumnStyle,
} from './timelineContent.css';
import { calculateBlockStyle, getGridTimes } from './timelineHelper';

const GRID_HORIZONTAL_COUNT = 20;

const TimelineContent = ({ participants, meetingStart, meetingEnd }: { 
  participants: Participant[]; 
  meetingStart: Date;
  meetingEnd: Date;
}) => {
  const gridTimes = getGridTimes(meetingStart, meetingEnd, GRID_HORIZONTAL_COUNT);
  return (
    <Flex direction='column' width='full'>
      <TimelineHeader
        endTime={meetingEnd}
        startTime={meetingStart}
      />
      <Flex
        className={timelineCanvasWrapperStyle}
        justify='center'
      >
        <TimelineCanvas
          gridTimes={gridTimes}
          meetingEnd={meetingEnd}
          meetingStart={meetingStart}
          participants={participants}
        />
      </Flex>
    </Flex>
  );
};

const TimelineHeader = ({ startTime: _, endTime: __ }: {
  startTime: Date;
  endTime: Date;
}) => (
  <Flex
    align='center'
    className={timelineHeaderStyle}
    direction='column'
    justify='center'
    width='full'
  >
    <Tooltip color='blue' tailDirection='down'>Here!</Tooltip>
  </Flex>
);

// TODO: 30분 단위에 종속적이지 않게 리팩토링하기 (canvas의 중앙 위치를 시간에 맞계 계산해야 함)
const TimelineCanvas = ({ gridTimes, meetingStart, meetingEnd, participants }: {
  gridTimes: Date[];
  participants: Participant[];
  meetingStart: Date;
  meetingEnd: Date;
}) => (
  <Flex
    className={timelineCanvasStyle}
    justify='center'
    width='full'
  >
    {gridTimes.map((stdTime, index) => { 
      const isInRange = meetingStart <= stdTime && stdTime < meetingEnd;
      return <div className={timelineColumnStyle({ isInRange })} key={index} />;
    })}
    <TimelineBlocks
      gridEnd={gridTimes[gridTimes.length - 1]}
      gridStart={gridTimes[0]}
      participants={participants}
    />
  </Flex>
);

const TimelineBlocks = ({ participants, gridStart, gridEnd }: {
  participants: Participant[];
  gridStart: Date;
  gridEnd: Date;
}) => {
  const a = 1;
  return (
    <Flex
      className={timelineBlockContainerStyle}
      direction='column'
    >
      {participants.map((participant, index) => (
        <div
          className={timelineBlockRowStyle}
          key={participant.id}
        >
          {participant.events.map((event, index) => (
            <TimelineBlock
              event={event}
              gridEnd={gridEnd}
              gridStart={gridStart}
              key={index}
            />
          ))}
        </div>
      ))}
    </Flex>
  );
};

const TimelineBlock = ({ gridStart, gridEnd, event }: {
  gridStart: Date;
  gridEnd: Date;
  event: ScheduleEvent;
}) => {
  const { left, width } = calculateBlockStyle(gridStart, gridEnd, event);
  return (
    <div
      className={timelineBlockStyle({ status: event.status })}
      style={{
        left: `${left}px`,
        width: `${width}px`,
      }}
    >
      {`${event.startDateTime.toLocaleTimeString()} ~ ${event.endDateTime.toLocaleTimeString()}`}
    </div>
  );
};
export default TimelineContent;