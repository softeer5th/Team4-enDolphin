import { Flex } from '@/components/Flex';
import { GoogleCalendar } from '@/components/Icon';

import { cardBottomStyle } from './index.css';

export const CardBottom = () => (
  <Flex
    align='flex-end'
    className={cardBottomStyle}
    gap={200}
    height='100%'
    justify='flex-end'
    width='full'
  >
    <GoogleCalendar />
  </Flex>
);
