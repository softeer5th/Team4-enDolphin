import { WEEK_MAP } from '@/constants/date';

/**
 * 날짜가 해당 달의 첫째주에 포함되는지를 판단합니다.
 * @param date - 날짜 객체.
 * @returns - 해당 달의 첫째주인지 여부.
 */
const isStartWithFirstWeek = (date: Date) => {
  const day = date.getDay();
  if (date.getDate() === 1 && (day === 5 || day === 6 || day === 0)) return false;
  if (date.getDate() === 2 && (day === 6 || day === 0)) return false;
  if (date.getDate() === 3 && day === 0) return false;
  return true;
};

/**
 * 해당 달의 마지막 주에 포함되는지를 판단합니다.
 * @param date - 날짜 객체.
 * @returns - 해당 달의 마지막 주인지 여부.
 */
const isEndWithLastWeek = (date: Date) => {
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysAfterWeekFirstDate = (lastDate.getDay() + 6) % 7;
  const isLastWeek = lastDate.getDate() - daysAfterWeekFirstDate <= date.getDate();

  const day = lastDate.getDay();
  if (isLastWeek && (day === 1 || day === 2 || day === 3)) return false;
  return true;
};

const getWeekNumber = (date: Date) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const offset = isStartWithFirstWeek(firstDayOfMonth) ? firstDayOfMonth.getDay() : 0;
  return Math.ceil((date.getDate() - (date.getDay() + 6) % 7 + offset) / 7);
};

type DateWeekType = {
  year: string;
  month: number;
  week: keyof typeof WEEK_MAP;
};
/**
 * 날짜가 몇년 몇월 몇 번째 주인지 계산합니다.
 * @example formatDateToWeek(new Date(2025, 2, 1)); // 25년 1월 다섯째주
 * @example formatDateToWeek(new Date(2025, 2, 2)); // 25년 2월 첫째주
 * @param date - 날짜 객체.
 * @returns - 특정 날짜의 년, 월, 주 정보를 담은 객체.
 */
export const formatDateToWeek = (date: Date): DateWeekType => {
  if (!isStartWithFirstWeek(date)) {
    const prevMonthLastDate = new Date(date.getFullYear(), date.getMonth(), 0);
    return formatDateToWeek(prevMonthLastDate);
  }
  
  if (!isEndWithLastWeek(date)) {
    const nextMonthFirstDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return {
      year: String(nextMonthFirstDate.getFullYear()).slice(2),
      month: nextMonthFirstDate.getMonth() + 1,
      week: WEEK_MAP[1],
    };
  }

  return {
    year: String(date.getFullYear()).slice(2),
    month: date.getMonth() + 1,
    week: WEEK_MAP[getWeekNumber(date)],
  };
};

/**
 * 
 * @param date - 날짜 객체.
 * @returns - 특정 날짜가 포함된 주의 날짜 객체 배열.
 */
export const formatDateToWeekDates = (date: Date): Date[] => {
  const selected = new Date(date);
  const firstDateOfWeek = new Date(selected.setDate(selected.getDate() - selected.getDay())); 
  const dates = new Array(7).fill(0)
    .map((_, i)=>{
      const DAY = 60 * 60 * 24 * 1000;
      const date = new Date(firstDateOfWeek.getTime() + i * DAY);
      return date;
    });

  return dates;
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

export const isWeekend = (date: Date): boolean => {
  const SUNDAY = 0;
  const SATURDAY = 6;
  
  return date.getDay() === SUNDAY || date.getDay() === SATURDAY;
};

/**
 * 
 * @param target - 비교할 날짜
 * @param startDate - 시작 날짜
 * @param endDate - 종료 날짜
 * @returns - 날짜가 범위 내에 있는지 여부
 */
export const isDateInRange = (
  target: Date,
  startDate: Date | null,
  endDate: Date | null,
): boolean => {
  if (!startDate || !endDate) return false;

  const targetTime = target.getTime();
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();

  return targetTime >= startTime && targetTime <= endTime;
};