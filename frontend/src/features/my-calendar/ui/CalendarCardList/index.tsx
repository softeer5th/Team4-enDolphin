
import { getDateParts, isAllday } from '@/utils/date';

import type { PersonalEventResponse } from '../../model';
import { DefaultCard } from './DefaultCard';

type CardItem = { card: PersonalEventResponse; start: Date; end: Date };
type OverlapCardItem = CardItem & { idx: number };

const sortCards = (e1: CardItem, e2: CardItem) => {
  const start1 = new Date(e1.start);
  const end1 = new Date(e1.end);
  const start2 = new Date(e2.start);
  const end2 = new Date(e2.end);

  if (start1 < start2) return -1;
  if (start1 > start2) return 1;
  if (end1 < end2) return -1;
  if (end1 > end2) return 1;

  return 0;
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

const groupByDate = (cards: PersonalEventResponse[]) => {
  const grouped: Record<string, CardItem[]> = {};

  const addCard = (key: number, content: CardItem) => {
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(content);
  };

  cards.filter((card)=>!isAllday(card.startDateTime, card.endDateTime)).forEach((card) => {
    const startDay = new Date(card.startDateTime).getDay();
    const endDay = new Date(card.endDateTime).getDay();
    const { start, end, sy, sm, sd, ey, em, ed } = createCardInfo(card);
    if (sd !== ed) {
      addCard(startDay, { card, start, end: new Date(sy, sm, sd, 23, 59) });
      addCard(endDay, { card, start: new Date(ey, em, ed, 0, 0), end });
    } else addCard(startDay, { card, start, end });
  });
  return Object.entries(grouped);
};

const groupByOverlap = (dayCards: CardItem[]) => dayCards.reduce((acc, cur, i, arr) => {
  if (i === 0 || arr[i - 1].end <= cur.start) return [...acc, [{ ...cur, idx: 0 }]];
  return [
    ...acc.slice(0, -1), 
    [...acc[acc.length - 1], { ...cur, idx: acc[acc.length - 1].length }],
  ];
}, [] as OverlapCardItem[][]).flat();

export const CalendarCardList = ({ cards }: { cards: PersonalEventResponse[] }) => (
  <div>
    {groupByDate(cards).map(([_, dayCards]) =>
      groupByOverlap(dayCards.sort(sortCards))
        .map(({ card, start, end, idx }) => (
          <DefaultCard
            card={card}
            end={end}
            idx={idx}
            key={card.id}
            start={start}
          />
        ),
        ),
    )}
  </div>
);