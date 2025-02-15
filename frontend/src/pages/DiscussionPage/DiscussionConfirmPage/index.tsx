
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import DiscussionConfirmCard from '@/features/discussion/ui/DiscussionConfirmCard';
import { vars } from '@/theme/index.css';

import { backdropStyle, containerStyle, subtitleStyle, titleStyle } from './index.css';

const mockData = {
  participantImageUrls: [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
  ],
  dateTimeRange: {
    start: new Date('2023-10-20T10:00:00'),
    end: new Date('2023-10-20T11:00:00'),
  },
  meetingDuration: 60,
};

const DiscussionConfirmPage = () => (
  <>
    <div className={backdropStyle} />
    <Flex
      align='center'
      className={containerStyle}
      direction='column'
      justify='center'
    >
      <Text className={titleStyle}typo='h3'>일정이 확정되었어요!</Text>
      <Text color={vars.color.Ref.Netural[600]} typo='b2M'>
        일정 조율이 완료되었습니다.
      </Text>
      <Text
        className={subtitleStyle}
        color={vars.color.Ref.Netural[600]}
        typo='b2M'
      >
        참여한 모든 인원의 개인 캘린더에 확정된 일정이 추가되었어요.
      </Text>
      <DiscussionConfirmCard
        meetingDateTimeRange={mockData.dateTimeRange}
        meetingDuration={mockData.meetingDuration}
        participantImageUrls={mockData.participantImageUrls}
      />
    </Flex>
  </>
);

export default DiscussionConfirmPage;