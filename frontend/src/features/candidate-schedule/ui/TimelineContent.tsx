
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import Tooltip from '@/components/Tooltip';
import { vars } from '@/theme/index.css';

import type { Participant, ScheduleEvent } from '../model';
import ParticipantList from './ParticipantList';
import {
  adjustRangeTimeBlockStyle,
  gridTimeTextStyle,
  gridTimeWrapperStyle,
  timelineBlockContainerStyle,
  timelineBlockRowStyle,
  timelineBlockStyle,
  timelineCanvasStyle,
  timelineCanvasWrapperStyle,
  timelineColumnContainerStyle,
  timelineColumnStyle,
  timelineContainerStyle,
  timelineHeaderStyle,
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
    <Flex
      className={timelineContainerStyle}
      direction='column'
      width='full'
    >
      <TimelineHeader
        endTime={meetingEnd}
        gridTimes={gridTimes}
        startTime={meetingStart}
      />
      <Flex
        className={timelineCanvasWrapperStyle}
        direction='row'
        gap={500}
        justify='space-between'
      >
        <ParticipantList participants={participants} />
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
      className={gridTimeWrapperStyle}
      direction='row'
      gap={100}
      justify='space-between'
    >
      {gridTimes.map((stdTime, index) => (
        <span
          className={gridTimeTextStyle}
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

// TODO-MAYBE: 30분 단위에 종속적이지 않게 리팩토링하기 (canvas의 중앙 위치를 시간에 맞계 계산해야 함)
const TimelineCanvas = ({ gridTimes, meetingStart, meetingEnd, participants }: {
  gridTimes: Date[];
  participants: Participant[];
  meetingStart: Date;
  meetingEnd: Date;
}) => (
  <Flex
    className={timelineCanvasStyle}
  >
    <TimelineColumns
      gridTimes={gridTimes}
      meetingEnd={meetingEnd}
      meetingStart={meetingStart}
    />
    <TimelineBlocks
      gridStart={gridTimes[0]}
      participants={participants}
    />
    <AdjustTimeRangeBox 
      gridStart={gridTimes[0]}
      meetingTimeEnd={meetingEnd}
      meetingTimeStart={meetingStart}
    />
  </Flex>
);

const TimelineColumns = ({ meetingStart, meetingEnd, gridTimes }: {
  meetingStart: Date; meetingEnd: Date; gridTimes: Date[];
}) => (
  <Flex
    className={timelineColumnContainerStyle}
    direction='row'
    style={{ height: '100%' }}
  >
    {gridTimes.map((stdTime, idx) => { 
      const isInRange = meetingStart <= stdTime && stdTime < meetingEnd;
      return <div className={timelineColumnStyle({ isInRange })} key={`${stdTime}-${idx}`} />;
    })}
  </Flex>
);

const AdjustTimeRangeBox = ({ meetingTimeStart, meetingTimeEnd, gridStart }: {
  gridStart: Date;
  meetingTimeStart: Date;
  meetingTimeEnd: Date;
}) => {
  const { width } = calculateBlockStyle(
    gridStart,
    meetingTimeStart,
    meetingTimeEnd);
  return (
    <div 
      className={adjustRangeTimeBlockStyle}
      style={{ width: `${width}px` }}
    />
  );
};

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
export default TimelineContent;