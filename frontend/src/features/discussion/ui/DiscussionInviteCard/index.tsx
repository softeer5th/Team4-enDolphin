
import { Modal } from '@/components/Modal';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import type { Time } from '@/utils/date';

import Badges from './Badges';
import {
  modalContentsStyle,
  modalFooterStyle,
} from './index.css';
import SubmitForm from './SubmitForm';

export interface DiscussionInviteCardProps {
  discussionId: number;
  hostName: string;
  title: string;
  canJoin: boolean;
  timeUnlocked: Date | null;
  // Badge props
  dateRange: { start: Date; end: Date };
  timeRange: { start: Time; end: Time };
  meetingDuration: number;
  requirePassword: boolean;
  location?: string;
}

// TODO: Input 입력 숫자 4-6자리로 제한

const DiscussionInviteCard = ({
  discussionId, hostName, title, canJoin, requirePassword, timeUnlocked, ...badgeProps
}: DiscussionInviteCardProps) => (
  <Modal
    isOpen
    subTitle={`${hostName}님이 일정 조율에 초대했어요!`}
    title={title}
  >
    <DiscussionInviteCardContents {...badgeProps} />
    <DiscussionInviteCardFooter
      canJoin={canJoin}
      discussionId={discussionId}
      requirePassword={requirePassword}
      timeUnlocked={timeUnlocked}
    />
  </Modal>
);

export default DiscussionInviteCard;

interface DiscussionInviteCardContentsProps {
  dateRange: { start: Date; end: Date };
  timeRange: { start: Time; end: Time };
  meetingDuration: number;
  location?: string;
}
const DiscussionInviteCardContents = (props: DiscussionInviteCardContentsProps) => (
  <Modal.Contents className={modalContentsStyle}>
    <Badges {...props} />
  </Modal.Contents>
);

interface DiscussionInviteCardFooterProps {
  canJoin: boolean;
  discussionId: number;
  requirePassword: boolean;
  timeUnlocked: Date | null;
}
const DiscussionInviteCardFooter = ({
  canJoin, requirePassword, discussionId, timeUnlocked,
}: DiscussionInviteCardFooterProps) => (
  <Modal.Footer className={modalFooterStyle({ disabled: !canJoin })}>
    {!canJoin && (
      <Text color={vars.color.Ref.Red[500]} typo='b2M'>
        인원이 꽉 찼어요
      </Text>
    )}
    <SubmitForm
      canJoin={canJoin}
      discussionId={discussionId}
      requirePW={requirePassword}
      unlockDateTime={timeUnlocked}
    />
  </Modal.Footer>
);
