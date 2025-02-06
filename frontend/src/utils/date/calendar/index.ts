export const WEEK_DAYS = 7;
export const FIRST_MONTH = 0;
export const LAST_MONTH = FIRST_MONTH + 11;
export const FIRST_DAY = 1;

/**
 * 해당 달의 일수를 반환합니다.
 * @param date - 기준 날짜.
 * @returns 해당 달의 일수.
 */
export const getDaysInMonth = (date: Date): number =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

/**
 * 이전 달의 정보를 반환합니다.
 * @param date - 기준 날짜.
 * @returns 이전 달의 { month, year } 정보.
 */
export const getPrevMonthInfo = (date: Date) => {
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  return currentMonth === FIRST_MONTH
    ? { month: LAST_MONTH, year: currentYear - 1 }
    : { month: currentMonth - 1, year: currentYear };
};

/**
 * 다음 달의 정보를 반환합니다.
 * @param date - 기준 날짜.
 * @returns 다음 달의 { month, year } 정보.
 */
export const getNextMonthInfo = (date: Date) => {
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  return currentMonth === LAST_MONTH
    ? { month: FIRST_MONTH, year: currentYear + 1 }
    : { month: currentMonth + 1, year: currentYear };
};

export const getDateParts = (date: Date) => ({
  year: date.getFullYear(),
  month: date.getMonth(),
  day: date.getDate(),
});
