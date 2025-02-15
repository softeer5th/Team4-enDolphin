import { Flex } from '@/components/Flex';

import { timelineColumnContainerStyle, timelineColumnStyle } from './index.css';

const TimelineColumns = ({ conflictStart, conflictEnd, gridTimes }: {
  conflictStart: Date; conflictEnd: Date; gridTimes: Date[];
}) => (
  <Flex
    className={timelineColumnContainerStyle}
    direction='row'
    style={{ height: '100%' }}
  >
    {gridTimes.map((stdTime, idx) => { 
      const isInRange = conflictStart <= stdTime && stdTime < conflictEnd;
      return <div className={timelineColumnStyle({ isInRange })} key={`${stdTime}-${idx}`} />;
    })}
  </Flex>
);

export default TimelineColumns;