
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import { getDateParts } from '@/utils/date';
import { formatTimeToColonString } from '@/utils/date/format';

interface HeaderProps {
  startDateTime: Date;
  endDateTime: Date;
}

const Header = ({ startDateTime, endDateTime }: HeaderProps) => (
  <Flex
    align='center'
    justify='space-between'
    width='full'
  >
    <HeaderTextInfo
      endDateTime={endDateTime}
      startDateTime={startDateTime}
    />
    <Flex align='center' gap={200}>
      {/* <Button size='lg'>
          다시 일정 조율하기
        </Button> */}
    </Flex>
  </Flex>
);

const HeaderTextInfo = ({ startDateTime, endDateTime }: {
  startDateTime: Date;
  endDateTime: Date;
}) => {
  const { month, day } = getDateParts(startDateTime);
  return (
    <Flex
      direction='column'
      gap={100}
    >
      <span>
        <Text color={vars.color.Ref.Primary[500]} typo='t1'>
          {`${month}월 ${day}일`}
        </Text>
      </span>
      <Text typo='h2'>
        {`${formatTimeToColonString(startDateTime)} ~ ${formatTimeToColonString(endDateTime)}`}
      </Text>
    </Flex>
  ); 
};

export default Header;
