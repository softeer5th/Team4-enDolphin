import { useNavigate } from '@tanstack/react-router';

import Button from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import type { Time } from '@/utils/date';

import { invitationApi } from '../../api/invitationApi';
import { useInvitationJoinMutation } from '../../api/mutations';
import Badges from './Badges';
import {
  modalContentsStyle,
  modalFooterStyle,
} from './index.css';

export interface DiscussionInviteCardProps {
  discussionId: number;
  hostName: string;
  title: string;
  // participantImageUrls: string[];
  canJoin: boolean;
  // Badge props
  dateRange: { start: Date; end: Date };
  timeRange: { start: Time; end: Time };
  meetingDuration: number;
  location?: string;
}

const DiscussionInviteCard = ({
  discussionId,
  hostName,
  title,
  canJoin,
  ...badgeProps
}: DiscussionInviteCardProps) => {
  const { mutate } = useInvitationJoinMutation();
  const navigate = useNavigate();
  return (
    <Modal
      isOpen
      subTitle={`${hostName}님이 일정 조율에 초대했어요!`}
      title={title}
    >
      <Modal.Contents className={modalContentsStyle}>
        <Badges {...badgeProps} />
      </Modal.Contents>
      <Modal.Footer className={modalFooterStyle({ disabled: !canJoin })}>
        {!canJoin && <Text color={vars.color.Ref.Red[500]} typo='b2M'>인원이 꽉 찼어요</Text>}
        <Button
          disabled={!canJoin}
          onClick={() => mutate({ 
            body: { discussionId, password: '778899' },
          },
          {
            onSuccess: () => { 
              navigate({ to: '/discussion/$id', params: { id: discussionId.toString() } });
            },
          })}
          size='xl'
        >
          초대 수락하기
        </Button>
      </Modal.Footer>
    </Modal>
  ); 
};

export default DiscussionInviteCard;