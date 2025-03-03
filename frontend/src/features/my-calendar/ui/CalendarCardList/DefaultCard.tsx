import { TIME_HEIGHT } from '@/constants/date';
import { calcPositionByDate } from '@/utils/date/position';

import type { PersonalEventResponse } from '../../model';
import { CalendarCard } from '../CalendarCard';

const calcSize = (height: number) => {
  if (height < TIME_HEIGHT) return 'sm';
  if (height < TIME_HEIGHT * 2.5) return 'md';
  return 'lg';
};

export const DefaultCard = (
  { card, start, end, idx }: 
  { card: PersonalEventResponse; start: Date; end: Date; idx: number },
) => {
  const LEFT_MARGIN = 24;
  const { x: sx, y: sy } = calcPositionByDate(start);
  const { y: ey } = calcPositionByDate(end);
    
  if (sy === ey) return null;
  
  const height = ey - sy;
  return (
    <CalendarCard
      calendarId={card.calendarId}
      endTime={new Date(card.endDateTime)}
      id={card.id}
      size={calcSize(height)}
      startTime={new Date(card.startDateTime)}
      status={card.isAdjustable ? 'adjustable' : 'fixed'}
      style={{
        width: `calc((100% - 72px) / 7 - 0.5rem - ${idx * LEFT_MARGIN}px)`,
        height,
        position: 'absolute',
        left: `calc(((100% - 72px) / 7 * ${sx}) + 72px)`,
        marginLeft: idx * LEFT_MARGIN,
        top: 16 + sy,
      }}
      title={card.title}
    />
  );
};
  