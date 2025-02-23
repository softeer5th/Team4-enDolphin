import { getDday, getYearMonthDay } from './date';
import { HOUR_IN_MINUTES } from './time';

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
};

export const formatMinutesToTimeString = (minutes: number): string => {
  const hours = Math.floor(minutes / HOUR_IN_MINUTES);
  const restMinutes = (minutes % HOUR_IN_MINUTES);
  const minutesString = restMinutes ? ` ${restMinutes.toString().padStart(2, '0')}분` : '';
  const amOrPm = hours >= 12 ? '오후' : '오전';

  const singleDigitHours = hours > 12 ? hours % 12 : hours;

  return `${amOrPm} ${singleDigitHours}시${minutesString}`;
};

export const formatNumberToTimeString = (number: number): string => {
  const hours = Math.floor(number / HOUR_IN_MINUTES).toString()
    .padStart(2, '0');
  const minutes = (number % HOUR_IN_MINUTES).toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const formatTimeStringToNumber = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':');
  return Number(hours) * HOUR_IN_MINUTES + Number(minutes);
};

export const formatDateToString = (date: Date | null): string => {
  if (!date) return '';
  const { year, month, day } = getYearMonthDay(date);
  return `${year.toString().slice(2)}년 ${month}월 ${day}일`;
};

export const formatMinutesToTimeDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / HOUR_IN_MINUTES);
  const restMinutes = (minutes % HOUR_IN_MINUTES);

  if (hours === 0) return `${restMinutes}분`;
  if (restMinutes === 0) return `${hours}시간`;
  return `${hours}시간 ${restMinutes}분`;
};

export const formatMillisecondsToDDay = (milliseconds: number): number => {
  const DAY = 1000 * 60 * 60 * 24;
  return Math.floor(milliseconds / DAY);
};

export const formatBarStringToLocaleString = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  return `${year.slice(2)}년 ${month}월 ${day}일`;
};

export const formatTimeStringToLocaleString = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':').map(Number);
  if (!minutes) return `${hours}시`;
  
  return `${hours}시 ${minutes}분`;
};

export const formatDateToDdayString = (date: Date): string => {
  const diffDays = getDday(date);

  if (diffDays === 0) return 'D-Day';
  if (diffDays > 0) return `D-${diffDays}`;
  return `D+${Math.abs(diffDays)}`;
};

export const getDowString = (date: Date): string => 
  date.toLocaleString('ko-KR', { weekday: 'short' });

export const formatTimeToDeadlineString = ({ days, hours, minutes }: {
  days: number;
  hours: number;
  minutes: number;
}): string => {
  if (days !== 0) return `${Math.abs(days)}일`;
  if (hours !== 0) return `${Math.abs(hours)}시간`;
  return `${Math.abs(minutes)}분`;
};