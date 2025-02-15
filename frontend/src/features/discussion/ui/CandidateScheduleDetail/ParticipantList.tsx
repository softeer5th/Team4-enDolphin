import { Flex } from '@/components/Flex';

import type { Participant } from '../../model';
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

const ParticipantItem = ({ participant }: { participant: Participant }) => (
  <div className={participantItemStyle}>
    {participant.name}
  </div>
);

export default ParticipantList;