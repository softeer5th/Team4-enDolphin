import Avatar from '@/components/Avatar';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';

import type { Participant, ScheduleEventStatus } from '../../model';
import ChipAble from './ChipAble';
import { participantItemStyle, participantsContainerStyle } from './participantList.css';

const ParticipantList  = ({ participants }: { participants: Participant[] }) => (
  <Flex
    className={participantsContainerStyle}
    direction='column'
    gap={200}
  >
    {participants.map((participant) => (
      <ParticipantItem key={participant.id} participant={participant} />
    ))}
  </Flex>
);

const ParticipantItem = ({ participant }: { participant: Participant }) => {
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
      {chipStatus !== 'notInRange' &&
        <ChipAble isAdjustable={chipStatus === 'adjustable'} />}
    </Flex>
  );
};

const getChipStatus = (participant: Participant): ScheduleEventStatus => {
  let isNotInRange = true;
  for (const event of participant.events) {
    if (event.status === 'fixed') {
      return 'fixed';
    }
    if (event.status === 'adjustable') {
      isNotInRange =  false;
    }
  }
  return isNotInRange ? 'notInRange' : 'adjustable';
};

export default ParticipantList;