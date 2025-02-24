
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import { getDateParts } from '@/utils/date';
import { formatTimeToColonString } from '@/utils/date/format';

interface HeaderProps {
  startDateTime: Date;
  endDateTime: Date;
}

// 링크 복사 : 시간 정보를 param 으로 넘겨받아야 하는데, 나중에 url 인코딩 구현하게 되면 그때 만들면 될 듯
const Header = ({ startDateTime, endDateTime }: HeaderProps) => 
  // const { handleCopyToClipboard } = useClipboard();
  (
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
        {/* <Button
          onClick={() => handleCopyToClipboard(window.location.href)}
          size='lg'
        >
          링크 복사
        </Button> */}
      </Flex>
    </Flex>
  ) 
;

const HeaderTextInfo = ({ startDateTime, endDateTime }: {
  startDateTime: Date;
  endDateTime: Date;
}) => {
// TODO: format 메서드 통합하기
  const { month, day } = getDateParts(startDateTime);
  return (
    <Flex
      direction='column'
      gap={100}
    >
      <span>
        <Text color={vars.color.Ref.Primary[500]} typo='t1'>
          {`${month + 1}월 ${day}일`}
        </Text>
      </span>
      <Text typo='h2'>
        {`${formatTimeToColonString(startDateTime)} ~ ${formatTimeToColonString(endDateTime)}`}
      </Text>
    </Flex>
  ); 
};

export default Header;
