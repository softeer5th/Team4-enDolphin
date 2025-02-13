import { TIME_HEIGHT } from '@/constants/date';
import { calcPositionByDate } from '@/utils/date/position';

import { CalendarCard } from '../CalendarCard';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const calcSize = (height: number) => {
  if (height < TIME_HEIGHT) return 'sm';
  if (height < TIME_HEIGHT * 2.5) return 'md';
  return 'lg';
};

export const CalendarCardList = ({ cards }: { cards: DateRange[] }) => (
  <>
    {cards.map((card, idx) => {
      const { x: sx, y: sy } = calcPositionByDate(card.startDate);
      const { y: ey } = calcPositionByDate(card.endDate);
      const height = ey - sy;
          
      return (
        <CalendarCard
          endTime={card.endDate}
          key={idx}
          size={calcSize(height)}
          startTime={card.startDate}
          status='adjustable'
          style={{
            width: 'calc((100% - 72px) / 7)',
            height,
            position: 'absolute',
            left: `calc(((100% - 72px) / 7 * ${sx}) + 72px)`,
            top: 16 + sy,
          }}
          title='새 일정 제목이 개길면 어떻게 될까?'
        />
      );
    })}
  </>
);