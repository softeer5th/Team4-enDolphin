import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Modal } from '@/components/Modal';
import { NotificationContext } from '@/components/Notification/NotificationContext';
import { Text } from '@/components/Text';
import { useSafeContext } from '@/hooks/useSafeContext';
import { vars } from '@/theme/index.css';
import type { Time } from '@/utils/date';

import { useInvitationJoinMutation } from '../../api/mutations';
import { modalContainerStyle } from '../DiscussionConfirmCard/index.css';
import Badges from './Badges';
import {
  inputStyle,
  modalContentsStyle,
  modalFooterStyle,
} from './index.css';

export interface DiscussionInviteCardProps {
  discussionId: number;
  hostName: string;
  title: string;
  canJoin: boolean;
  // Badge props
  dateRange: { start: Date; end: Date };
  timeRange: { start: Time; end: Time };
  meetingDuration: number;
  requirePassword: boolean;
  location?: string;
}

// TODO: 5회 실패 시 에러 Noti (지금은 500 에러 뜸)
// TODO: Input 입력 숫자 4-6자리로 제한

const DiscussionInviteCard = ({
  discussionId, hostName, title, canJoin, requirePassword, ...badgeProps
}: DiscussionInviteCardProps) => {
  const navigate = useNavigate();
  const { mutate } = useInvitationJoinMutation();
  const [password, setPassword] = useState('');
  const { addNoti } = useSafeContext(NotificationContext);
  const handleJoinClick = () => {
    mutate(
      { body: { discussionId, password: password === '' ? undefined : password } },
      {
        onSuccess: (data) => {
          if (data.isSuccess) {
            navigate({ to: '/discussion/$id', params: { id: discussionId.toString() } });
          } else {
            addNoti({ type: 'error', title: `비밀번호가 일치하지 않습니다 - ${data.failedCount}회 시도` });
          }
        },
      },
    );
  };

  return (
    <Modal
      className={modalContainerStyle}
      isOpen
      subTitle={`${hostName}님이 일정 조율에 초대했어요!`}
      title={title}
    >
      <DiscussionInviteCardContents {...badgeProps} />
      <DiscussionInviteCardFooter
        canJoin={canJoin}
        onJoinClick={handleJoinClick}
        requirePassword={requirePassword}
        setPassword={setPassword}
      />
    </Modal>
  );
};

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
  requirePassword: boolean;
  onJoinClick: () => void;
  setPassword: (password: string) => void;
}
const DiscussionInviteCardFooter = ({
  canJoin,
  requirePassword,
  onJoinClick,
  setPassword,
}: DiscussionInviteCardFooterProps) => (
  <Modal.Footer className={modalFooterStyle({ disabled: !canJoin })}>
    {!canJoin && (
      <Text color={vars.color.Ref.Red[500]} typo='b2M'>
        인원이 꽉 찼어요
      </Text>
    )}
    <Flex
      align='flex-end'
      direction='row'
      gap={500}
    >
      {requirePassword && (
        <input
          className={inputStyle}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='숫자 4~6자리 비밀번호'
        />
      )}
      <Button
        disabled={!canJoin}
        onClick={onJoinClick}
        size='xl'
      >
        초대 수락하기
      </Button>
    </Flex>
  </Modal.Footer>
);
