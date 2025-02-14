
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import Tooltip from '@/components/Tooltip';
import { vars } from '@/theme/index.css';

import type { Participant, ScheduleEvent } from '../../model';
import {
  adjustRangeTimeBlockStyle,
  timelineBlockContainerStyle,
  timelineBlockRowStyle,
  timelineBlockStyle,
  timelineCanvasStyle,
  timelineCanvasWrapperStyle,
  timelineColumnStyle,
  timelineHeaderStyle,
  timelineHeaderTimeTextStyle,
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
      <Flex
        className={timelineCanvasWrapperStyle}
        direction='column'
        justify='flex-start'
      >
        <TimelineHeader
          endTime={meetingEnd}
          gridTimes={gridTimes}
          startTime={meetingStart}
        />
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

const TimelineHeader = ({ startTime: _, endTime: __, gridTimes }: {
  startTime: Date;
  endTime: Date;
  gridTimes: Date[];
}) => (
  <Flex
    align='center'
    className={timelineHeaderStyle}
    direction='column'
    justify='center'
    width='full'
  >
    <Tooltip color='blue' tailDirection='down'>Here!</Tooltip>
    <Flex
      align='center'
      direction='row'
      gap={100}
      justify='space-between'
      style={{ position: 'relative', height: '2.125rem' }}
      width='full'
    >
      {gridTimes.map((stdTime, index) => (
        <span
          className={timelineHeaderTimeTextStyle}
          key={index}
          style={{ left: `${index * 34}px` }}
        > 
          <Text
            color={vars.color.Ref.Netural[500]} 
            typo='b3M'
          >
            {stdTime.getMinutes() === 0 && stdTime.getHours()}
          </Text>
        </span>
      ))}
    </Flex>
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
    // justify='center'
  >
    <TimelineBlocks
      gridEnd={gridTimes[gridTimes.length - 1]}
      gridStart={gridTimes[0]}
      gridTimes={gridTimes}
      meetingEnd={meetingEnd}
      meetingStart={meetingStart}
      participants={participants}
    />
    {/* <AdjustTimeRangeBox 
      gridEnd={gridTimes[gridTimes.length - 1]}
      gridStart={gridTimes[0]}
      meetingTimeEnd={meetingEnd}
      meetingTimeStart={meetingStart}
    /> */}
  </Flex>
);

const TimelineColumns = ({ meetingStart, meetingEnd, gridTimes }: {
  meetingStart: Date; meetingEnd: Date; gridTimes: Date[];
}) => (
  <Flex
    direction='row'
    style={{ height: '100%' }}
    width='full'
  >
    {gridTimes.map((stdTime, idx) => { 
      const isInRange = meetingStart <= stdTime && stdTime < meetingEnd;
      return <div className={timelineColumnStyle({ isInRange })} key={`${stdTime}-${idx}`} />;
    })}
  </Flex>
);

const AdjustTimeRangeBox = ({ meetingTimeStart, meetingTimeEnd, gridStart, gridEnd }: {
  gridStart: Date;
  gridEnd: Date;
  meetingTimeStart: Date;
  meetingTimeEnd: Date;
}) => {
  const { width } = calculateBlockStyle(
    gridStart,
    gridEnd,
    meetingTimeStart,
    meetingTimeEnd);
  return (
    <div 
      className={adjustRangeTimeBlockStyle}
      style={{ width: `${width}px` }}
    />
  );
};

const TimelineBlocks = ({ participants, gridStart, gridEnd, gridTimes, meetingEnd, meetingStart }: {
  participants: Participant[];
  gridTimes: Date[];
  meetingStart: Date;
  meetingEnd: Date;
  gridStart: Date;
  gridEnd: Date;
}) => (
  <Flex
    className={timelineBlockContainerStyle}
    direction='column'
  >
    <TimelineColumns
      gridTimes={gridTimes}
      meetingEnd={meetingEnd}
      meetingStart={meetingStart}
    />
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

const TimelineBlock = ({ gridStart, gridEnd, event }: {
  gridStart: Date;
  gridEnd: Date;
  event: ScheduleEvent;
}) => {
  const { left, width } = calculateBlockStyle(
    gridStart, gridEnd, event.startDateTime, event.endDateTime,
  );
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