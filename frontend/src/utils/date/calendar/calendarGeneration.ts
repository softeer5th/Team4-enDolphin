import { FIRST_DAY, FIRST_MONTH, LAST_MONTH, WEEK_DAYS } from './calendarHelpers';

/**
 * 주어진 연도와 월(0-indexed)을 기반으로 해당 달의 총 일수를 반환합니다.
 */
export const getDaysInMonth = (year: number, month: number): number =>
  new Date(year, month + 1, 0).getDate();

/**
 * 1차원 배열을 size 크기로 2차원 배열로 분할합니다.
 * @param array - 분할할 배열
 * @param size - 분할할 크기 (2차원 배열에서 열의 개수)
 */
const partitionArray = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export interface CalendarDay {
  day: number;
  month: number; // 0-indexed (0: January ~ 11: December)
  year: number;
  isCurrentMonth: boolean;
}

/**
 * 이전 달 정보를 반환합니다.
 * @param year - 연도
 * @param month - 현재 달 (0-indexed)
 */
const getPreviousMonthInfo = (year: number, month: number) => {
  const prevMonth = month === FIRST_MONTH ? LAST_MONTH : month - 1;
  const prevYear = month === FIRST_MONTH ? year - 1 : year;
  return { prevMonth, prevYear, prevMonthDays: getDaysInMonth(prevYear, prevMonth) };
};

/**
 * 이전 달의 날짜(Date 객체)들을 배열로 생성합니다.
 */
const generatePreviousMonthDays = (year: number, month: number): Date[] => {
  const { prevMonth, prevYear, prevMonthDays } = getPreviousMonthInfo(year, month);
  // 현재 달의 1일의 요일 (0: 일요일 ~ 6: 토요일)
  const firstDayDow = new Date(year, month, FIRST_DAY).getDay();
  const dates: Date[] = [];
  for (let i = firstDayDow; i > 0; i--) {
    dates.push(new Date(prevYear, prevMonth, prevMonthDays - i + 1));
  }
  return dates;
};

/**
 * 현재 달의 날짜(Date 객체)들을 배열로 생성합니다.
 */
const generateCurrentMonthDays = (year: number, month: number): Date[] => {
  const totalDays = getDaysInMonth(year, month);
  const dates: Date[] = [];
  for (let day = FIRST_DAY; day <= totalDays; day++) {
    dates.push(new Date(year, month, day));
  }
  return dates;
};

/**
 * 다음 달 정보를 반환합니다.
 * @param year - 연도
 * @param month - 현재 달 (0-indexed)
 */
const getNextMonthInfo = (year: number, month: number) => {
  const nextMonth = month === LAST_MONTH ? FIRST_MONTH : month + 1;
  const nextYear = month === LAST_MONTH ? year + 1 : year;
  return { nextMonth, nextYear };
};

/**
 * 남은 칸을 다음 달 날짜로 채웁니다.
 * @param existingCount - 이전 달과 현재 달 날짜의 총 개수
 */
const generateNextMonthDays = (existingCount: number, year: number, month: number): Date[] => {
  const remainingCells = (WEEK_DAYS - (existingCount % WEEK_DAYS)) % WEEK_DAYS;
  const { nextMonth, nextYear } = getNextMonthInfo(year, month);
  const dates: Date[] = [];
  for (let day = FIRST_DAY; day <= remainingCells; day++) {
    dates.push(new Date(nextYear, nextMonth, day));
  }
  return dates;
};

/**
 * 연도와 월(0-indexed)을 기반으로 달력의 날짜들을 2차원 배열로 생성합니다.
 * 각 하위 배열은 한 주(7일)를 나타내며, 모든 날짜는 Date 객체입니다.
 * @param year - 연도
 * @param month - 월 (0-indexed)
 */
export const generateMonthCalendar = (year: number, month: number): Date[][] => {
  const previousDays = generatePreviousMonthDays(year, month);
  const currentDays = generateCurrentMonthDays(year, month);
  const combinedDays = [...previousDays, ...currentDays];
  const nextDays = generateNextMonthDays(combinedDays.length, year, month);
  const daysArray = [...combinedDays, ...nextDays];
  return partitionArray(daysArray, WEEK_DAYS);
};
