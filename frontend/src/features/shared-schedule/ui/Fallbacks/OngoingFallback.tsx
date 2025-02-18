import { Flex } from '@/components/Flex';
import { CheckGraphic } from '@/components/Icon/component/CheckGraphic';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

const OngoingFallback = () => (
  <Flex
    align='center'
    direction='column'
    gap={600}
    height='19.75rem'
    width='83.25rem'
  >
    <CheckGraphic height={180} width={180} />
    <Text color={vars.color.Ref.Netural[700]} typo='h3'>아직 다가오는 일정이 없어요!</Text>
  </Flex>
);

export default OngoingFallback;
