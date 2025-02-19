
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import type { DiscussionConfirmResponse } from '@/features/discussion/model';
import DiscussionConfirmCard from '@/features/discussion/ui/DiscussionConfirmCard';
import { vars } from '@/theme/index.css';

import { backdropStyle, containerStyle, subtitleStyle, titleStyle } from './index.css';

const DiscussionConfirmPage = ({ confirm }: { confirm: DiscussionConfirmResponse }) => (
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
      <DiscussionConfirmCard {...confirm} />
    </Flex>
  </>
);

export default DiscussionConfirmPage;