import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import { formatTimeToColonString } from '@/utils/date/format';

const Header = ({ adjustCount, startTime, endTime }: {
  adjustCount: number;
  startTime: Date;
  endTime: Date;
}) => (
  <Flex
    align='center'
    justify='space-between'
    width='full'
  >
    <HeaderTextInfo
      adjustCount={adjustCount}
      endTime={endTime}
      startTime={startTime}
    />
    <Flex
      align='center'
      gap={200}
    >
      <Button
        size='lg'
        style='weak'
        variant='secondary'
      >
        링크 복사
      </Button>
      <Button
        size='lg'
      >
        일정 확정하기
      </Button>
    </Flex>
  </Flex>
);

const HeaderTextInfo = ({ adjustCount, startTime, endTime }: {
  adjustCount: number;
  startTime: Date;
  endTime: Date;
}) => (
  <Flex
    direction='column'
    gap={100}
  >
    <span>
      <Text color={vars.color.Ref.Primary[500]} typo='h3'>
        {`${adjustCount}명`}
      </Text>
      <Text typo='h3'>
        만 조율하면 돼요
      </Text>
    </span>
    <Text typo='h2'>
      {`${formatTimeToColonString(startTime)} ~ ${formatTimeToColonString(endTime)}`}
    </Text>
  </Flex>
);

export default Header;
