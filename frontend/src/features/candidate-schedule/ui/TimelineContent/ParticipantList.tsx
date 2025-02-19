import Avatar from '@/components/Avatar';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';

import type { Participant, ScheduleEventStatus } from '../../model';
import ChipAble from './ChipAble';
import { participantItemStyle, participantsContainerStyle } from './participantList.css';

interface ParticipantListProps {
  selectedParticipants: Participant[];
  ignoredParticipants: Participant[];
}

const ParticipantList  = ({ selectedParticipants, ignoredParticipants }: ParticipantListProps) => (
  <Flex
    className={participantsContainerStyle}
    direction='column'
    gap={200}
  >
    {selectedParticipants.map((participant) => (
      <ParticipantItem
        isIgnoredParticipant={false}
        key={participant.id}
        participant={participant}
      />
    ))}
    {ignoredParticipants.map((participant) => (
      <ParticipantItem
        isIgnoredParticipant={true}
        key={participant.id}
        participant={participant}
      />
    ))}
  </Flex>
);

const ParticipantItem = ({ participant, isIgnoredParticipant }: { 
  participant: Participant;
  isIgnoredParticipant: boolean;
}) => {
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
      {!isIgnoredParticipant && chipStatus !== 'outOfRange' &&
        <ChipAble isAdjustable={chipStatus === 'adjustable'} />}
    </Flex>
  );
};

const getChipStatus = (participant: Participant): ScheduleEventStatus => {
  let isOutOfRange = true;
  for (const event of participant.events) {
    if (event.status === 'fixed') {
      return 'fixed';
    }
    if (event.status === 'adjustable') {
      isOutOfRange =  false;
    }
  }
  return isOutOfRange ? 'outOfRange' : 'adjustable';
};

export default ParticipantList;