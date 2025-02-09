import Avatar from '@/components/Avatar';
import { Chip } from '@/components/Chip';
import { Flex } from '@/components/Flex';
import { ChevronRight } from '@/components/Icon';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import { chevronButtonStyle, containerStyle } from './scheduleCard.css';

interface ScheduleCardProps {
  selected: boolean;
  // scheduleInfo: object;
}

const ScheduleCard = ({ selected }: ScheduleCardProps) => (
  <Flex
    className={containerStyle({ selected })}
    direction='column'
    justify='space-between'
  >
    <Flex direction='column' gap={300}>
      <Chip
        color={selected ? 'black' : 'coolGray'}
        radius='max'
        size='md'
        style={selected ? 'filled' : 'weak'}
      >
        D-day
      </Chip>
      <Text typo='h3'>기업디(3) 첫 팀플</Text>
      <Flex direction='column'>
        <Text color={vars.color.Ref.Netural[600]} typo='b2R'>12월 30일 오후 11시 ~ 오후 12시</Text>
        <Text color={vars.color.Ref.Netural[600]} typo='b2R'>강남역 4번 출구</Text>
      </Flex>
    </Flex>
    <Flex
      align='center'
      justify='space-between'
      width='full'
    >
      <Avatar imageUrls={['hi.com', 'hi.com']} size='lg' />
      <button className={chevronButtonStyle({ selected })}>
        <ChevronRight
          clickable
          fill={vars.color.Ref.Netural[800]}
          width={28}
        />
      </button>
    </Flex>
  </Flex>
);

export default ScheduleCard;
