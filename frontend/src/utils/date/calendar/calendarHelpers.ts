export const WEEK_DAYS = 7;
export const FIRST_MONTH = 0;
export const LAST_MONTH = FIRST_MONTH + 11;
export const FIRST_DAY = 1;

/**
 * 해당 달의 일수를 반환합니다.
 * @param year - 년도.
 * @param month - 월 (0-indexed: 0 ~ 11).
 * @returns 해당 달의 일수.
 */
export const getDaysInMonth = (year: number, month: number): number =>
  new Date(year, month + 1, 0).getDate();

/**
 * 이전 달의 정보를 반환합니다.
 * @param month - 현재 월 (0-indexed).
 * @param year - 현재 연도.
 * @returns 이전 달의 { month, year } 정보.
 */
export const getPrevMonthInfo = (month: number, year: number) =>
  month === FIRST_MONTH
    ? { month: LAST_MONTH, year: year - 1 }
    : { month: month - 1, year };

/**
 * 다음 달의 정보를 반환합니다.
 * @param month - 현재 월 (0-indexed).
 * @param year - 현재 연도.
 * @returns 다음 달의 { month, year } 정보.
 */
export const getNextMonthInfo = (month: number, year: number) =>
  month === LAST_MONTH
    ? { month: FIRST_MONTH, year: year + 1 }
    : { month: month + 1, year };
