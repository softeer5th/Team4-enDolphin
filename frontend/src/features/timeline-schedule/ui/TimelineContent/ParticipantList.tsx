import Avatar from '@/components/Avatar';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';

import type { Participant, ScheduleEventStatus } from '../../model';
import { useTimelineContext } from '../TimelineContext';
import ChipAble from './ChipAble';
import { participantItemStyle, participantsContainerStyle } from './participantList.css';

interface ParticipantListProps {
  checkedParticipants: Participant[];
  uncheckedParticipants: Participant[];
}

const ParticipantList  = ({ 
  checkedParticipants,
  uncheckedParticipants, 
}: ParticipantListProps) => (
  <Flex
    className={participantsContainerStyle}
    direction='column'
    gap={200}
  >
    {checkedParticipants.map((participant) => (
      <ParticipantItem
        isUncheckedParticipant={false}
        key={participant.id}
        participant={participant}
      />
    ))}
    {uncheckedParticipants.map((participant) => (
      <ParticipantItem
        isUncheckedParticipant={true}
        key={participant.id}
        participant={participant}
      />
    ))}
  </Flex>
);

const ParticipantItem = ({ participant, isUncheckedParticipant }: { 
  participant: Participant;
  isUncheckedParticipant: boolean;
}) => {
  const { isConfirmedSchedule } = useTimelineContext();
  const chipStatus = getChipStatus(participant);
  return (
    <Flex
      align='center'
      className={participantItemStyle}
      justify='space-between'
    >
      <Flex align='center' gap={200}>
        <Avatar imageUrls={[participant.picture]} size='lg' />
        <Text typo='b2M'>{participant.name}</Text>
      </Flex>
      {!isConfirmedSchedule && !isUncheckedParticipant &&
      <Flex width={80}>
        <ChipAble chipStatus={chipStatus} />
      </Flex>}
    </Flex>
  );
};

const getChipStatus = (participant: Participant): ScheduleEventStatus => {
  if (participant.events.some(event => event.status === 'FIXED')) return 'FIXED';
  return participant.events.some(event => event.status === 'ADJUSTABLE') 
    ? 'ADJUSTABLE' : 'OUT_OF_RANGE';
};

export default ParticipantList;