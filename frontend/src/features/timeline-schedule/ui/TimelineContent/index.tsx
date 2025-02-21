
import { useRef } from 'react';

import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import Tooltip from '@/components/Tooltip';
import { vars } from '@/theme/index.css';

import type { Participant } from '../../model';
import TimelineCanvas from '../TImelineCanvas';
import { getGridTimes, getRowTopOffset } from '../timelineHelper';
import {
  bodyContainerStyle,
  containerStyle,
  dimStyle,
  gridTimeContainerStyle,
  gridTimeTextStyle,
  timelineHeaderStyle,
} from './index.css';
import ParticipantList from './ParticipantList';

interface TimelineContentProps {
  conflictStart: Date;
  conflictEnd: Date;
  checkedParticipants: Participant[];
  uncheckedParticipants: Participant[];
}

const TimelineContent = (props: TimelineContentProps) => {
  const { gridTimes, gridStartOffset } = getGridTimes(props.conflictStart, props.conflictEnd);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);

  return (
    <div className={containerStyle}>
      <TimelineHeader gridStartOffset={gridStartOffset} gridTimes={gridTimes} />
      <div
        className={bodyContainerStyle}
        // onScroll={handleScroll}
        ref={scrollRef}
      >
        <ParticipantList {...props} />
        <TimelineCanvas
          {...props}
          gridStartOffset={gridStartOffset}
          gridTimes={gridTimes}
          participants={[...props.checkedParticipants, ...props.uncheckedParticipants]}
        />
        {props.uncheckedParticipants.length > 0 && 
        <div
          className={dimStyle}
          ref={dimRef}
          style={{ 
            top: getRowTopOffset(props.checkedParticipants.length),
            height: getRowTopOffset(props.uncheckedParticipants.length), 
          }}
        />}
      </div>
    </div>
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

export default TimelineContent;