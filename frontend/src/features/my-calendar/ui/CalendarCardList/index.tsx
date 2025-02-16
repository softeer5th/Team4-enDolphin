import { TIME_HEIGHT } from '@/constants/date';
import { calcPositionByDate } from '@/utils/date/position';

import type { PersonalEventDTO } from '../../model';
import { CalendarCard } from '../CalendarCard';

const calcSize = (height: number) => {
  if (height < TIME_HEIGHT) return 'sm';
  if (height < TIME_HEIGHT * 2.5) return 'md';
  return 'lg';
};

export const CalendarCardList = (
  { cards }: { cards: Omit<PersonalEventDTO, 'syncWithGoogleCalendar'>[] },
) => (
  <>
    {cards.map((card) => {
      const start = new Date(card.startDateTime);
      const end = new Date(card.endDateTime);
      const { x: sx, y: sy } = calcPositionByDate(start);
      const { y: ey } = calcPositionByDate(end);
      const height = ey - sy;

      return (
        <CalendarCard
          endTime={end}
          id={card.id}
          key={card.id}
          size={calcSize(height)}
          startTime={start}
          status={card.isAdjustable ? 'adjustable' : 'fixed'}
          style={{
            width: 'calc((100% - 72px) / 7)',
            height,
            position: 'absolute',
            left: `calc(((100% - 72px) / 7 * ${sx}) + 72px)`,
            top: 16 + sy,
          }}
          title={card.title}
        />
      );
    })}
  </>
);