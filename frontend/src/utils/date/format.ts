import { getYearMonthDay } from './date';

/**
 * 날짜 객체를 YY-MM-DD 형식의 문자열로 변환합니다.
 * @param date - 날짜 객체
 * @returns 
 */
export const formatDateToBarString = (date: Date | null): string => {
  if (!date) return '';
  const { year, month, day } = getYearMonthDay(date);
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

export const formatDateToDotString = (date: Date | null): string => {
  if (!date) return '';
  const { year, month, day } = getYearMonthDay(date);
  return `${year}. ${month.toString().padStart(2, '0')}. ${day.toString().padStart(2, '0')}`;
};