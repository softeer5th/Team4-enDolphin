import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import { formatDateToTimeString } from '@/utils/date';

import { timeBarStyle, timeBarWrapperStyle } from './index.css';

export const CalendarTimeBar = ({ height }: { height: number }) => (
  <Flex
    className={timeBarWrapperStyle}
    style={{ top: height }}
    width='100%'
  >
    <Text color={vars.color.Ref.Primary[500]} typo='caption'>
      {formatDateToTimeString(new Date())}
    </Text>
    <div className={timeBarStyle} />
  </Flex>
);