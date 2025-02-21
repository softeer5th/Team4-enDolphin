
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import DiscussionConfirmButton from '@/features/discussion/ui/DiscussionConfirmButton';
import { vars } from '@/theme/index.css';
import { formatTimeToColonString } from '@/utils/date/format';

interface HeaderProps {
  adjustCount: number;
  discussionId: number;
  startDateTime: string;
  endDateTime: string;
}

const Header = ({ adjustCount, startDateTime, endDateTime }: HeaderProps) => (
  <Flex
    align='center'
    justify='space-between'
    width='full'
  >
    <HeaderTextInfo
      adjustCount={adjustCount}
      endTime={new Date(endDateTime)}
      startTime={new Date(startDateTime)}
    />
    <Flex align='center' gap={200}>
      {/* TODO: date 관리 방식 통합 (string OR Date) */}
      <DiscussionConfirmButton endDateTime={endDateTime} startDateTime={startDateTime} />
    </Flex>
  </Flex>
);

const HeaderTextInfo = ({ adjustCount, startTime, endTime }: {
  adjustCount: number;
  startTime: Date;
  endTime: Date;
}) => {
  const needsAdjust = adjustCount > 0;
  return (
    <Flex
      direction='column'
      gap={100}
    >
      <span>
        <Text color={vars.color.Ref.Primary[500]} typo='h3'>
          {needsAdjust ? `${adjustCount}명` : '모두 '}
        </Text>
        <Text typo='h3'>
          {needsAdjust ? '만 조율하면 돼요' : '가능해요'}
        </Text>
      </span>
      <Text typo='h2'>
        {`${formatTimeToColonString(startTime)} ~ ${formatTimeToColonString(endTime)}`}
      </Text>
    </Flex>
  ); 
};

export default Header;
