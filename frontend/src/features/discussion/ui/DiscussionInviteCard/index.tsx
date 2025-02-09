import Avatar from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Modal } from '@/components/Modal';
import { getDateRangeString, getTimeRangeString } from '@/utils/date';

import { 
  avatarWrapperStyle,
  badgeContainerStyle, 
  modalContentsStyle,
  modalFooterStyle, 
} from './index.css';

interface DiscussionInviteCardProps {
  hostName: string;
  dateRange: { start: Date; end: Date };
  timeRange: { start: Date; end: Date };
  meetingDuration: number;
  participantImageUrls: string[];
  location?: string;
}

const DiscussionInviteCard = ({
  hostName,
  dateRange,
  timeRange,
  meetingDuration,
  participantImageUrls,
  location,
}: DiscussionInviteCardProps) => (
  <Modal
    isOpen
    subTitle={`${hostName}님이 일정 조율에 초대했어요!`}
    title='기업디(3) 첫 팀플'
  >
    <Modal.Contents className={modalContentsStyle}>
      <Flex
        align='center'
        className={badgeContainerStyle}
        gap={250}
        justify='flex-start'
      >
        <Badge iconType='date'>{getDateRangeString(dateRange.start, dateRange.end)}</Badge>
        <Badge iconType='date'>{getTimeRangeString(timeRange.start, timeRange.end)}</Badge>
        {/* 분 단위 포맷 구현 (~시간 ~분으로) */}
        <Badge iconType='time'>{`${meetingDuration}분`}</Badge>
        {location && <Badge iconType='location'>{location}</Badge>}
      </Flex>
      <Flex
        align='center'
        className={avatarWrapperStyle}
        justify='flex-start'
      >
        <Avatar imageUrls={participantImageUrls} size='lg' />
      </Flex>
    </Modal.Contents>
    <Modal.Footer className={modalFooterStyle}>
      <Button size='xl'>초대 수락하기</Button>
    </Modal.Footer>
  </Modal>
);

export default DiscussionInviteCard;