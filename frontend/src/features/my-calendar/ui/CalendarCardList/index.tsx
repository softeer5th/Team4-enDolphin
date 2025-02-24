import { TIME_HEIGHT } from '@/constants/date';
import { getDateParts, isAllday } from '@/utils/date';
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
      size={calcSize(height)}
      startTime={new Date(card.startDateTime)}
      status={card.isAdjustable ? 'adjustable' : 'fixed'}
      style={{
        width: 'calc((100% - 72px) / 7 - 0.5rem)',
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
        const { year: sy, month: sm, day: sd } = getDateParts(start);
        const { year: ey, month: em, day: ed } = getDateParts(end);

        if (sd !== ed) {
          return (
            <>
              <DefaultCard
                card={card}
                end={new Date(sy, sm, sd, 23, 59)}
                key={`${card.id}-start`}
                start={start}
              />
              <DefaultCard
                card={card}
                end={end}
                key={`${card.id}-end`}
                start={new Date(ey, em, ed, 0, 0)}
              />
            </>
          );
        }

        return (
          <DefaultCard
            card={card}
            end={end}
            key={card.id}
            start={start}
          />
        );
      })}
  </>
);