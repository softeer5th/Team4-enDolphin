
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Modal } from '@/components/Modal';

import BadgeContainer from './BadgeContainer';
import {
  avatarWrapperStyle,
  modalContainerStyle,
  modalContentsStyle,
  modalFooterStyle,
} from './index.css';

export interface DiscussionConfirmCardProps {
  participantImageUrls: string[];
  // Badge props
  meetingDateTimeRange: { start: Date; end: Date };
  meetingDuration: number;
  location?: string;
}

const DiscussionConfirmCard = ({
  participantImageUrls,
  ...badgeProps
}: DiscussionConfirmCardProps) => (
  <>
    <Modal
      className={modalContainerStyle}
      isOpen
      subTitle={'확정된 일정'}
      title='기업디(3) 첫 팀플'
    >
      <Modal.Contents className={modalContentsStyle}>
        <BadgeContainer {...badgeProps} />
        <Flex
          align='center'
          className={avatarWrapperStyle}
          justify='flex-start'
        >
          <Avatar imageUrls={participantImageUrls} size='lg' />
        </Flex>
      </Modal.Contents>
      <Modal.Footer className={modalFooterStyle}>
        <Buttons />
      </Modal.Footer>
    </Modal>
  </>
);

const Buttons = () => (
  <>
    <Button
      size='xl'
      style='borderless'
    >
      다시 일정 조율하기
    </Button>
    <Button
      onClick={() => alert('navigate to my calendar')}
      size='xl'
    >
      내 캘린더 확인하기
    </Button>
  </>
);

export default DiscussionConfirmCard;