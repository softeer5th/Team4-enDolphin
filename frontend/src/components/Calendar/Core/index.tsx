import { Flex } from '@/components/Flex';

import { CalendarHeader } from './CalendarHeader';
import { coreStyle } from './index.css';
import { SelectedWeek } from './SelectedWeek';
import { TimeControl } from './TimeControl';

export const Core = () => (
  <Flex
    className={coreStyle}
    direction='column'
    width='100%'
  >  
    <TimeControl />
    <SelectedWeek />
    <CalendarHeader />
  </Flex>
);