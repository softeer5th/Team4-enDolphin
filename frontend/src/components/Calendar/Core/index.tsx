import { Flex } from '@/components/Flex';

import { coreStyle } from './index.css';
import { SelectedWeek } from './SelectedWeek';
import { TimeControl } from './TimeControl';

export const Core = () => (
  <Flex
    className={coreStyle}
    direction='column'
    height='8.375rem'
    width='100%'
  >  
    <TimeControl />
    <SelectedWeek />
  </Flex>
);