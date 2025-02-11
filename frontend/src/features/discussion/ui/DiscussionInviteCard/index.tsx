import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Modal } from '@/components/Modal';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import Badges from './Badges';
import {
  avatarWrapperStyle,
  modalContentsStyle,
  modalFooterStyle,
} from './index.css';

export interface DiscussionInviteCardProps {
  hostName: string;
  participantImageUrls: string[];
  canJoin: boolean;
  // Badge props
  dateRange: { start: Date; end: Date };
  timeRange: { start: Date; end: Date };
  meetingDuration: number;
  location?: string;
}

const DiscussionInviteCard = ({
  hostName,
  participantImageUrls,
  canJoin,
  ...badgeProps
}: DiscussionInviteCardProps) => (
  <Modal
    isOpen
    subTitle={`${hostName}님이 일정 조율에 초대했어요!`}
    title='기업디(3) 첫 팀플'
  >
    <Modal.Contents className={modalContentsStyle}>
      <Badges {...badgeProps} />
      <Flex
        align='center'
        className={avatarWrapperStyle}
        justify='flex-start'
      >
        <Avatar imageUrls={participantImageUrls} size='lg' />
      </Flex>
    </Modal.Contents>
    <Modal.Footer className={modalFooterStyle({ disabled: !canJoin })}>
      {!canJoin && <Text color={vars.color.Ref.Red[500]} typo='b2M'>인원이 꽉 찼어요</Text>}
      <Button
        disabled={!canJoin}
        onClick={() => alert('초대 수락됨')}
        size='xl'
      >
        초대 수락하기
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DiscussionInviteCard;