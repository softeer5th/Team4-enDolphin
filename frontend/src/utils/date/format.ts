import { getYearMonthDay } from './date';
import { HOUR } from './time';

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

export const formatDateToDateTimeString = (date: Date | null): string => {
  if (!date) return '';
  return `${formatDateToBarString(date)}T${formatDateToTimeString(date)}:00`;
};

export const formatTimeToColonString = (date: Date | null): string => {
  if (!date) return '';
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};
export const formatDateToTimeString = (date: Date | null): string => {
  if (!date) return '';

  const hours = date.getHours().toString()
    .padStart(2, '0');
  const minutes = date.getMinutes().toString()
    .padStart(2, '0');

  return `${hours}:${minutes}`;
};export const formatMinutesToTimeString = (minutes: number): string => {
  const hours = Math.floor(minutes / HOUR);
  const restMinutes = (minutes % HOUR);
  const minutesString = restMinutes ? ` ${restMinutes.toString().padStart(2, '0')}분` : '';
  const amOrPm = hours >= 12 ? '오후' : '오전';

  return `${amOrPm} ${hours}시${minutesString}`;
};
export const formatNumberToTimeString = (number: number): string => {
  const hours = Math.floor(number / HOUR).toString();
  const minutes = (number % HOUR).toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};
export const formatTimeStringToNumber = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':');
  return Number(hours) * HOUR + Number(minutes);
};

