import { WEEK_MAP } from '@/constants/date';

import { getTimeParts, HOUR_IN_MILLISECONDS, MINUTE_IN_MILLISECONDS } from './time';

export const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

const SUNDAY_CODE = 0;
const SATURDAY_CODE = 6;

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
export const formatDateToWeekDates = (date: Date | null): Date[] => {
  if (!date) return [];

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
 * @param date - 날짜 객체.
 * @returns - 특정 날짜가 포함된 주의 첫째 날과 마지막 날의 날짜 객체.
 */

export const formatDateToWeekRange = (date: Date): {
  startDate: Date;
  endDate: Date;
} => {
  const selected = new Date(date);
  const firstDateOfWeek = new Date(selected);
  firstDateOfWeek.setDate(firstDateOfWeek.getDate() - selected.getDay());
  
  const lastDateOfWeek = new Date(firstDateOfWeek);
  lastDateOfWeek.setDate(firstDateOfWeek.getDate() + 6);

  return { startDate: firstDateOfWeek, endDate: lastDateOfWeek };
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

export const isWeekend = (date: Date): boolean => 
  date.getDay() === SUNDAY_CODE || date.getDay() === SATURDAY_CODE;

/**
 * 두 날짜 객체를 비교하여 시작 날짜와 종료 날짜를 반환합니다.
 * @param date1 - 비교할 날짜1
 * @param date2 - 비교할 날짜2
 * @returns - 시작 날짜와 종료 날짜
 */
export const sortDate = (date1: Date | null, date2: Date | null): {
  startDate: Date | null;
  endDate: Date | null;
} => {
  if (!date1 || !date2) {
    return { 
      startDate: date1 || date2, 
      endDate: date1 || date2, 
    };
  }
  const [startDate, endDate] 
    = [date1, date2].sort((a, b) => a.getTime() - b.getTime());
  return { startDate, endDate };
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

  const { startDate: start, endDate: end } = sortDate(startDate, endDate);
  if (!start || !end) return false;

  const targetTime = target.getTime();
  const startTime = start.getTime();
  const endTime = end.getTime();

  return targetTime >= startTime && targetTime <= endTime;
};

export const isSaturday = (date: Date | null): boolean => {
  if (!date) return false;
  return  date.getDay() === SATURDAY_CODE;
};

export const isSunday = (date: Date): boolean => date.getDay() === SUNDAY_CODE;
// TODO: 공휴일 OPEN API에 연결
// export const isHoliday = (date: Date): boolean => false;

export const getDateParts = (date: Date) => ({
  year: date.getFullYear(),
  month: date.getMonth(),
  day: date.getDate(),
});

/**
 * 날짜 객체를 year, month, day로 분리합니다.
 * @param date - 날짜 객체
 * @returns { year, month, day } 형태의 객체
 */
export const getYearMonthDay = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return { year, month, day };
};

export const isAllday = (startDate: string, endDate: string): boolean => {
  const ALL_DAY = 24 * 60 * 60 * 1000;

  if (!startDate || !endDate) return false;
  return new Date(endDate).getTime() - new Date(startDate).getTime() >= ALL_DAY;
};

export const getDateRangeString = (startDate: Date, endDate: Date): string => {
  const { year: startY, month: startM, day: startD } = getDateParts(startDate);
  const { year: endY, month: endM, day: endD } = getDateParts(endDate);

  const isSameYear = startY !== endY;
  const format = (year: number, month: number, day: number): string =>
    isSameYear ? `${year}년 ${month + 1}월 ${day}일` : `${month + 1}월 ${day}일`;

  return `${format(startY, startM, startD)} ~ ${format(endY, endM, endD)}`;
};

export const getDateTimeRangeString = (start: Date, end: Date): string => {
  const { month: startMonth, day: startDay } = getYearMonthDay(start);
  const { month: endMonth, day: endDay } = getYearMonthDay(end);

  const convertTime = (date: Date): string => {
    const { hour, minute } = getTimeParts(date);
    const period = hour >= 12 ? '오후' : '오전';
    const hour12 = hour % 12 || 12;
    const paddedMinutes = minute.toString().padStart(2, '0');
    return minute === 0 ? `${period} ${hour12}시` : `${period} ${hour12}시 ${paddedMinutes}분`;
  };

  const startTime = convertTime(start);
  const endTime = convertTime(end);

  if (startMonth === endMonth && startDay === endDay) {
    return `${startMonth}월 ${startDay}일 ${startTime} ~ ${endTime}`;
  } 
  return `${startMonth}월 ${startDay}일 ${startTime} ~ ${endMonth}월 ${endDay}일 ${endTime}`;
};

export const getDayDiff = (date: Date): number => {
  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff = targetDate.getTime() - todayDate.getTime();
  return Math.floor(diff / DAY_IN_MILLISECONDS);
};

export const getTimeLeftInfoFromMilliseconds = (milliseconds: number) => {
  const days = Math.floor(milliseconds / DAY_IN_MILLISECONDS);
  const remainingAfterDays = milliseconds % DAY_IN_MILLISECONDS;

  const hours = Math.floor(remainingAfterDays / HOUR_IN_MILLISECONDS);
  const remainingAfterHours = remainingAfterDays % HOUR_IN_MILLISECONDS;
  const minutes = Math.floor(remainingAfterHours / MINUTE_IN_MILLISECONDS);

  return { days, hours, minutes };
};

export const isNextWeek = (start: Date, end: Date) => {
  const { year: sy, month: sm, day: sd } = getDateParts(start);
  const { year: ey, month: em, day: ed } = getDateParts(end);
  const startDate = new Date(sy, sm, sd);
  const endDate = new Date(ey, em, ed);

  const timeDiff = Math.abs(startDate.getTime() - endDate.getTime());

  if (timeDiff > 7 * DAY_IN_MILLISECONDS) return true;
  if (start.getDay() > end.getDay()) return true;
  return false;
};

export const setDateOnly = (baseDate: Date, newDate: Date) => {
  const updatedDate = new Date(baseDate);
  updatedDate.setFullYear(newDate.getFullYear());
  updatedDate.setMonth(newDate.getMonth());
  updatedDate.setDate(newDate.getDate());
  return updatedDate;
};