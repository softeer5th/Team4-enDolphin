import { TIME_HEIGHT } from '@/constants/date';

import { getDateParts, setDateOnly } from './date';

interface DateRange {
  start: Date;
  end: Date;
}

export const calcPositionByDate = (date: Date | null) => {
  if (!date) return { x: 0, y: 0 };

  const day = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const height = TIME_HEIGHT * hour + TIME_HEIGHT * (minute / 60);

  return { x: day, y: height };
};

// TODO: 테스트 코드 작성
/**
 * 
 * @param targetDare
 * @param targetDate.start - 계산할 범위의 시작 날짜
 * @param targetDate.end - 계산할 범위의 끝 날짜
 * @param selectedWeek - 현재 렌더링된 주의 날짜 배열
 * @returns
 */
export const calcSizeByDate = ({ start, end }: DateRange, selectedWeek: Date[]) => {
  const { year: syear, month: sm, day: sd } = getDateParts(selectedWeek[0]);
  const { year: eyear, month: em, day: ed } = getDateParts(selectedWeek[6]);

  const firstDayOfWeek = new Date(syear, sm, sd, 0, 0, 0);
  const lastDayOfWeek = new Date(eyear, em, ed, 23, 59, 59);

  const startDate = start > firstDayOfWeek ? start : setDateOnly(start, firstDayOfWeek);
  const endDate = end < lastDayOfWeek ? end : setDateOnly(end, lastDayOfWeek);

  const { x: sx, y: sy } = calcPositionByDate(startDate);
  const { x: ex, y: ey } = calcPositionByDate(endDate);

  const dayDiff = ex - sx;
  const height = ey - sy;

  return { width: dayDiff + 1, height, x: sx, y: sy };
};