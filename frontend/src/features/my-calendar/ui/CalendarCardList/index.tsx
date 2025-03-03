
import { getDateParts, isAllday } from '@/utils/date';

import type { PersonalEventResponse } from '../../model';
import { DefaultCard } from './DefaultCard';

const sortCards = (e1: PersonalEventResponse, e2: PersonalEventResponse) => {
  const start1 = new Date(e1.startDateTime);
  const end1 = new Date(e1.endDateTime);
  const start2 = new Date(e2.startDateTime);
  const end2 = new Date(e2.endDateTime);

  if (start1 < start2) return -1;
  if (start1 > start2) return 1;
  if (end1 < end2) return -1;
  if (end1 > end2) return 1;

  return 0;
};

const groupByDate = (cards: PersonalEventResponse[]) => {
  const grouped: Record<string, PersonalEventResponse[]> = {};
  cards.filter((card)=>!isAllday(card.startDateTime, card.endDateTime)).forEach((card) => {
    const key = new Date(card.startDateTime).getDay();
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(card);
  });
  return Object.entries(grouped);
};

const createCardInfo = (card: PersonalEventResponse) => {
  const start = new Date(card.startDateTime);
  const end = new Date(card.endDateTime);
  const { year: sy, month: sm, day: sd } = getDateParts(start);
  const { year: ey, month: em, day: ed } = getDateParts(end);
  return {
    start,
    end,
    sy, sm, sd,
    ey, em, ed,
  };
};

const calcOverlapIndex = (
  start: Date,
  group: PersonalEventResponse[],
) => {
  const overlapCount = group.filter((other) => {
    const otherEnd = new Date(other.endDateTime);
    return start < otherEnd;
  }).length;

  return overlapCount - 1;
};

export const CalendarCardList = ({ cards }: { cards: PersonalEventResponse[] }) => (
  <>
    {groupByDate(cards).map(([_, dayCards]) =>
      dayCards.sort(sortCards)
        .map((card, idx) => {
          const { start, end, sy, sm, sd, ey, em, ed } = createCardInfo(card);
          const overlapIdx = calcOverlapIndex(start, dayCards.slice(0, idx + 1));
          if (sd !== ed) {
            return (
              <div key={card.id}>
                <DefaultCard
                  card={card}
                  end={new Date(sy, sm, sd, 23, 59)}
                  idx={overlapIdx}
                  start={start}
                />
                <DefaultCard
                  card={card}
                  end={end}
                  idx={0}
                  start={new Date(ey, em, ed, 0, 0)}
                />
              </div>
            );
          }
          return (
            <DefaultCard
              card={card}
              end={end}
              idx={overlapIdx}
              key={card.id}
              start={start}
            />
          );
        }),
    )}
  </>
);