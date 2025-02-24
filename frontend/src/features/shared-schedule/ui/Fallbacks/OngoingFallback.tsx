import { Flex } from '@/components/Flex';
import { ClockGraphic } from '@/components/Icon/custom/ClockGraphic';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import { ongoingFallbackContainerStyle } from './index.css';

const OngoingFallback = () => (
  <Flex
    align='center'
    className={ongoingFallbackContainerStyle}
    direction='column'
    gap={600}
    height='35.25rem'
    width='full'
  >
    <ClockGraphic height={200} width={200} />
    <Text color={vars.color.Ref.Netural[700]} typo='h3'>확정되지 않은 일정이 없어요</Text>
  </Flex>
);

export default OngoingFallback;
