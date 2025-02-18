import { TIME_HEIGHT } from '@/constants/date';
import { isAllday } from '@/utils/date';
import { calcPositionByDate } from '@/utils/date/position';

import type { PersonalEventResponse } from '../../model';
import { CalendarCard } from '../CalendarCard';

const calcSize = (height: number) => {
  if (height < TIME_HEIGHT) return 'sm';
  if (height < TIME_HEIGHT * 2.5) return 'md';
  return 'lg';
};

const DefaultCard = (
  { card, start, end }: { card: PersonalEventResponse; start: Date; end: Date },
) => {
  const { x: sx, y: sy } = calcPositionByDate(start);
  const { y: ey } = calcPositionByDate(end);
  const height = ey - sy;
  return (
    <CalendarCard
      calendarId={card.calendarId}
      endTime={new Date(card.endDateTime)}
      id={card.id}
      key={card.id}
      size={calcSize(height)}
      startTime={new Date(card.startDateTime)}
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
};

export const CalendarCardList = ({ cards }: { cards: PersonalEventResponse[] }) => (
  <>
    {cards.filter((card) => !isAllday(card.startDateTime, card.endDateTime))
      .map((card) => {
        const start = new Date(card.startDateTime);
        const end = new Date(card.endDateTime);

        if (start.getDate() !== end.getDate()) {
          return (
            <>
              <DefaultCard
                card={card}
                end={new Date(start.getFullYear(), start.getMonth(), start.getDate(), 23, 59)}
                start={start}
              />
              <DefaultCard
                card={card}
                end={end}
                start={new Date(end.getFullYear(), end.getMonth(), end.getDate(), 0, 0)}
              />
            </>
          );
        }

        return (
          <DefaultCard
            card={card}
            end={end}
            start={start}
          />
        );
      })}
  </>
);