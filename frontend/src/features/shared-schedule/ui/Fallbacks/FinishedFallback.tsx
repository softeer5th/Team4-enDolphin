import { Flex } from '@/components/Flex';
import { ClockGraphic } from '@/components/Icon/custom/ClockGraphic';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

const FinishedFallback = () => (
  <Flex
    align='center'
    direction='column'
    gap={600}
    height='41.375rem'
    width='full'
  >
    <ClockGraphic height={200} width={200} />
    <Text color={vars.color.Ref.Netural[700]} typo='h3'>지난 일정이 없어요</Text>
  </Flex>
);

export default FinishedFallback;
