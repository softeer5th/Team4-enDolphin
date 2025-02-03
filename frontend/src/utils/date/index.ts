import { WEEK_MAP } from '@/constants/date';

const isStartWithFirstWeek = (firstDay: Date) => {
  const day = firstDay.getDay();
  if (day === 5 || day == 6 || day === 0) return false;
  return true;
};

/**
 * 
 * @param date - 날짜 객체.
 * @returns 
 */
const calcWeekNum = (date: Date): string => {

  const isFirstDay = date.getDate() === 1;
  if (isFirstDay && !isStartWithFirstWeek(date)) {
    const prevMonthLastDate = new Date(date.getFullYear(), date.getMonth(), 0);
    const prevMonthLastDay = prevMonthLastDate.getDay();
    const daysInPrevMonth = prevMonthLastDate.getDate();

    const lastWeekDays = 7 - prevMonthLastDay;
    const week = Math.ceil((daysInPrevMonth - lastWeekDays + 7) / 7);
    return WEEK_MAP[week];
  }

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstWeekfirstDay = 
    isStartWithFirstWeek(date) ? firstDay.getDate() : firstDay.getDate() + 1;
  const week = Math.floor((date.getDate() - firstWeekfirstDay + 7) / 7);

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
 * @returns 해당 날짜가 포함된 주의 정보를 반환.
 * 
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