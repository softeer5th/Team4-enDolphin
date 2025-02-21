import { useTimelineContext } from '../TimelineContext';
import { calculateBlockStyle } from '../timelineHelper';
import { conflictRangeTimeBlockStyle } from './index.css';

const ConflictRangeBox = ({ conflictTimeStart, conflictTimeEnd, gridStart }: {
  gridStart: Date;
  conflictTimeStart: Date;
  conflictTimeEnd: Date;
}) => {
  const { width } = calculateBlockStyle(
    gridStart,
    conflictTimeStart,
    conflictTimeEnd,
  );
  const { isConfirmedSchedule } = useTimelineContext();
  return (
    <div 
      className={conflictRangeTimeBlockStyle({ isConfirmedSchedule })}
      style={{ width: `${width}px` }}
    />
  );
};

export default ConflictRangeBox;