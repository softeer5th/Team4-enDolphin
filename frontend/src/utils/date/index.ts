import { WEEK_MAP } from '@/constants/date';

/**
 * 해당 달의 1일이 첫째주에 포함되는지를 판단합니다.
 * @param firstDay - 해당 달의 1일 날짜 객체.
 * @returns - 해당 달의 1일이 해당 달의 첫째주인지 여부.
 */
const isStartWithFirstWeek = (firstDay: Date) => {
  const day = firstDay.getDay();
  if (day === 5 || day == 6 || day === 0) return false;
  return true;
};

/**
 * 날짜가 해당 달의 몇 번째 주인지 계산합니다.
 * @example calcWeekNum(new Date(2025, 1, 1)); // 1월 5주차
 * @example calcWeekNum(new Date(2025, 1, 2)); // 2월 1주차
 * @param date - 날짜 객체.
 * @returns - 해당 날짜가 몇 번째 주인지를 알리는 문자열 정보. ex) 첫째주, 둘째주, ...
 */
const calcWeekNum = (date: Date): string => {
  const isFirstDay = date.getDate() === 1;
  if (isFirstDay && !isStartWithFirstWeek(date)) {
    const prevMonthLastDate = new Date(date.getFullYear(), date.getMonth(), 0);
    return calcWeekNum(prevMonthLastDate);
  }

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstWeekFirstDay = 
    isStartWithFirstWeek(date) ? firstDay.getDate() : firstDay.getDate() + 1;
  const week = Math.floor((date.getDate() - firstWeekFirstDay + 7) / 7);

  return WEEK_MAP[week];
};

type DateWeekType = {
  year: string;
  month: number;
  week: string;
  dates: Date[];
};

/**
 * 
 * @param date - 날짜 객체.
 * @returns - 특정 날짜의 년, 월, 주, 날짜가 포함된 주의 날짜 객체 배열.
 */
export const formatDateToWeek = (date: Date): DateWeekType => {
  const selected = new Date(date);
  const firstDateOfWeek = new Date(selected.setDate(selected.getDate() - selected.getDay())); 
  const year = date.getFullYear().toString();

  const dates = new Array(7).fill(0)
    .map((_, i)=>{
      const DAY = 60 * 60 * 24 * 1000;
      const date = new Date(firstDateOfWeek.getTime() + i * DAY);
      return date;
    });

  return {
    year: year.slice(2),
    month: date.getMonth() + 1,
    week: calcWeekNum(date),
    dates,
  };
};

/**
 * 
 * @param date1 - 비교할 날짜1
 * @param date2 - 비교할 날짜2
 * @returns 두 날짜가 같은 날짜인지 여부
 */
export const isSameDate = (date1: Date, date2: Date): boolean => (
  date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
);