
import { useRef } from 'react';

import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import Tooltip from '@/components/Tooltip';
import { vars } from '@/theme/index.css';

import type { Participant, ScheduleEvent } from '../../model';
import { calculateBlockStyle, getGridTimes, getRowTopOffset } from '../timelineHelper';
import {
  bodyContainerStyle,
  conflictRangeTimeBlockStyle,
  containerStyle,
  gridTimeContainerStyle,
  gridTimeTextStyle,
  overlayStyle,
  timelineBlockContainerStyle,
  timelineBlockRowStyle,
  timelineBlockStyle,
  timelineCanvasStyle,
  timelineColumnContainerStyle,
  timelineColumnStyle,
  timelineHeaderStyle,
} from './index.css';
import ParticipantList from './ParticipantList';

interface TimelineContentProps {
  participants: Participant[];
  conflictStart: Date;
  conflictEnd: Date;
  selectedParticipants: Participant[];
  ignoredParticipants: Participant[];
}

const TimelineContent = (props: TimelineContentProps) => {
  const { gridTimes, gridStartOffset } = getGridTimes(props.conflictStart, props.conflictEnd);
  const scrollRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    if (scrollRef.current && overlayRef.current) {
      overlayRef.current.style.transform = `translateY(-${scrollRef.current.scrollTop}px)`;
    }
  };
  return (
    <Flex
      className={containerStyle}
      direction='column'
      width='full'
    >
      <TimelineHeader gridStartOffset={gridStartOffset} gridTimes={gridTimes} />
      <div
        className={bodyContainerStyle}
        onScroll={handleScroll}
        ref={scrollRef}
      >
        <ParticipantList participants={props.participants} />
        <TimelineCanvas
          {...props}
          gridStartOffset={gridStartOffset}
          gridTimes={gridTimes}
        />
      </div>
      <div
        className={overlayStyle}
        ref={overlayRef}
        style={{ 
          top: getRowTopOffset(props.selectedParticipants.length) + 72,
          height: getRowTopOffset(props.ignoredParticipants.length) + 60,
        }}
      />
    </Flex>
  );
};

const TimelineHeader = ({ gridTimes, gridStartOffset }: {
  gridTimes: Date[];
  gridStartOffset: number;
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
      className={gridTimeContainerStyle}
      direction='row'
      gap={100}
      justify='space-between'
      style={{ left: `${gridStartOffset}px` }}
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

const TimelineColumns = ({ conflictStart, conflictEnd, gridTimes }: {
  conflictStart: Date; conflictEnd: Date; gridTimes: Date[];
}) => (
  <Flex
    className={timelineColumnContainerStyle}
    direction='row'
    style={{ height: '100%' }}
  >
    {gridTimes.map((stdTime, idx) => { 
      const isInRange = conflictStart <= stdTime && stdTime < conflictEnd;
      return <div className={timelineColumnStyle({ isInRange })} key={`${stdTime}-${idx}`} />;
    })}
  </Flex>
);

const ConflictRangeBox = ({ conflictTimeStart, conflictTimeEnd, gridStart }: {
  gridStart: Date;
  conflictTimeStart: Date;
  conflictTimeEnd: Date;
}) => {
  const { width } = calculateBlockStyle(
    gridStart,
    conflictTimeStart,
    conflictTimeEnd);
  return (
    <div 
      className={conflictRangeTimeBlockStyle}
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