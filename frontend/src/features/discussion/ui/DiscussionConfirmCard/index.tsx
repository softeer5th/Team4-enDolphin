
import { Link } from '@tanstack/react-router';

import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Modal } from '@/components/Modal';

import type { DiscussionConfirmResponse } from '../../model';
import BadgeContainer from './BadgeContainer';
import {
  avatarWrapperStyle,
  modalContainerStyle,
  modalContentsStyle,
  modalFooterStyle,
} from './index.css';

const DiscussionConfirmCard = (
  { title, participantPictureUrls, ...badgeProps }: DiscussionConfirmResponse,
) => (
  <>
    <Modal
      className={modalContainerStyle}
      isOpen
      subTitle={'확정된 일정'}
      title={title}
    >
      <Modal.Contents className={modalContentsStyle}>
        <BadgeContainer
          endDateTime={new Date(badgeProps.sharedEventDto.endDateTime)}
          location={badgeProps.meetingMethodOrLocation}
          startDateTime={new Date(badgeProps.sharedEventDto.startDateTime)}
        />
        <Flex
          align='center'
          className={avatarWrapperStyle}
          justify='flex-start'
        >
          <Avatar imageUrls={participantPictureUrls} size='lg' />
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
    {/* <Button
      size='xl'
      style='borderless'
    >
      다시 일정 조율하기
    </Button> */}
    <Button
      as={Link}
      size='xl'
      to='/my-calendar'
    >
      내 캘린더 확인하기
    </Button>
  </>
);

export default DiscussionConfirmCard;