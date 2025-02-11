import { Flex } from '@/components/Flex';

import { SelectedWeek } from './SelectedWeek';
import { TimeControl } from './TimeControl';

export const Core = () => (
  <Flex
    direction='column'
    gap={400}
    width='100%'
  >  
    <TimeControl />
    <SelectedWeek />
  </Flex>
);