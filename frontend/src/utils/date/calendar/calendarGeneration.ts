import { FIRST_DAY, WEEK_DAYS } from '.';

/**
 * 주어진 연도와 월(0-indexed)을 기반으로 해당 달의 총 일수를 반환합니다.
 */
export const getDaysInMonth = (date: Date): number =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

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

/**
 * 이전 달 정보를 반환합니다.
 * @param year - 연도
 * @param month - 현재 달 (0-indexed)
 */
const getPreviousMonthInfo = (date: Date) => {
  const prevDate = new Date(date);
  prevDate.setMonth(date.getMonth() - 1);
  return { prevDate, prevMonthDays: getDaysInMonth(prevDate) };
};

/**
 * 이전 달의 날짜(Date 객체)들을 배열로 생성합니다.
 */
const generatePreviousMonthDays = (baseDate: Date): Date[] => {
  const { prevDate, prevMonthDays } = getPreviousMonthInfo(baseDate);
  // 현재 달의 1일의 요일 (0: 일요일 ~ 6: 토요일)
  const firstDayDow = new Date(baseDate.getFullYear(), baseDate.getMonth(), FIRST_DAY)
    .getDay();

  const dates: Date[] = [];
  for (let i = firstDayDow; i > 0; i--) {
    dates.push(new Date(prevDate.getFullYear(), prevDate.getMonth(), prevMonthDays - i + 1));
  }
  return dates;
};

/**
 * 현재 달의 날짜(Date 객체)들을 배열로 생성합니다.
 */
const generateCurrentMonthDays = (baseDate: Date): Date[] => {
  const totalDays = getDaysInMonth(baseDate);
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  
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
const getNextMonthInfo = (baseDate: Date) => {
  const nextDate = new Date(baseDate);
  nextDate.setMonth(baseDate.getMonth() + 1);
  return { nextDate, prevMonthDays: getDaysInMonth(nextDate) };
};

/**
 * 남은 칸을 다음 달 날짜로 채웁니다.
 * @param existingCount - 이전 달과 현재 달 날짜의 총 개수
 */
const generateNextMonthDays = (existingCount: number, baseDate: Date): Date[] => {
  const remainingCells = (WEEK_DAYS - (existingCount % WEEK_DAYS)) % WEEK_DAYS;
  const { nextDate } = getNextMonthInfo(baseDate);
  const [nextYear, nextMonth] = [nextDate.getFullYear(), nextDate.getMonth()];
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
export const generateMonthCalendar = (baseDate: Date): Date[][] => {
  const previousDays = generatePreviousMonthDays(baseDate);
  const currentDays = generateCurrentMonthDays(baseDate);
  const combinedDays = [...previousDays, ...currentDays];
  const nextDays = generateNextMonthDays(combinedDays.length, baseDate);
  const daysArray = [...combinedDays, ...nextDays];
  return partitionArray(daysArray, WEEK_DAYS);
};
