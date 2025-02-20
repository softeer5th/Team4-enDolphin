import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { useDiscussionConfirmMutation } from '@/features/discussion/api/mutations';
import { vars } from '@/theme/index.css';
import { formatDateToDateTimeString, formatTimeToColonString } from '@/utils/date/format';

interface HeaderProps {
  adjustCount: number;
  discussionId: number;
  startDateTime: Date;
  endDateTime: Date;
}

const Header = ({ adjustCount, discussionId, startDateTime, endDateTime }: HeaderProps) => {
  const { mutate } = useDiscussionConfirmMutation();
  return(
    <Flex
      align='center'
      justify='space-between'
      width='full'
    >
      <HeaderTextInfo
        adjustCount={adjustCount}
        endTime={endDateTime}
        startTime={startDateTime}
      />
      <Flex align='center' gap={200}>
        {/* <Button
        size='lg'
        style='weak'
        variant='secondary'
      >
        링크 복사
      </Button> */}
        {/* TODO: date 관리 방식 통합 (string OR Date) */}
        <Button
          onClick={() => mutate({
            id: discussionId.toString(), 
            body: { 
              startDateTime: formatDateToDateTimeString(startDateTime),
              endDateTime: formatDateToDateTimeString(endDateTime),
            }, 
          })}
          size='lg'
        >
          일정 확정하기
        </Button>
      </Flex>
    </Flex>
  ); 
};

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
