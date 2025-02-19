export const HOUR = 60;
const HOUR_IN_MILLISECONDS = 1000 * 60 * 60;
export const MINUTE_IN_MILLISECONDS = 60000;

export const formatDateToTimeString = (date: Date | null): string => {
  if (!date) return '';

  const hours = date.getHours().toString()
    .padStart(2, '0');
  const minutes = date.getMinutes().toString()
    .padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const getTimeParts = (date: Date) => ({
  hour: date.getHours(),
  minute: date.getMinutes(),
});

export const getTimeRangeString = (startTime: Date, endTime: Date): string => {
  const { hour: startHour, minute: startMinute } = getTimeParts(startTime);
  const { hour: endHour, minute: endMinute } = getTimeParts(endTime);

  const format = (hour: number, minute: number) => 
    minute === 0 ? `${hour}시` : `${hour}시 ${minute}분`;

  return `${format(startHour, startMinute)} ~ ${format(endHour, endMinute)}`;
};

export const getMinuteDiff = (startTime: Date, endTime: Date): number => { 
  const MINUTE_IN_MILLISECONDS = 60000;
  const diff = endTime.getTime() - startTime.getTime();
  return Math.floor(diff / MINUTE_IN_MILLISECONDS);
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

export const getHourDiff = (startTime: Date, endTime: Date, ignoreDateDiff = true): number => {
  if (ignoreDateDiff) {
    return endTime.getHours() - startTime.getHours();
  } 
  const diffMilliseconds = endTime.getTime() - startTime.getTime();
  return Math.floor(diffMilliseconds / HOUR_IN_MILLISECONDS);
};

export interface Time {
  hour: number;
  minute: number;
  second?: number;
}

export const parseTime = (timeStr: string): Time => {
  const parts = timeStr.trim().split(':');
  if (parts.length < 2 || parts.length > 3) {
    throw new Error('parseTime: Invalid time format');
  }

  const [hourStr, minuteStr, secondStr = '0'] = parts;
  const hour = Number(hourStr);
  const minute = Number(minuteStr);
  const second = Number(secondStr);

  if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
    throw new Error('parseTime: Invalid numeric values in time string');
  }
  if (hour < 0 || hour > 23) throw new Error('parseTime: Hour must be between 0 and 23');
  if (minute < 0 || minute > 59) throw new Error('parseTime: Minute must be between 0 and 59');
  if (second < 0 || second > 59) throw new Error('parseTime: Second must be between 0 and 59');

  return { hour, minute, second };
};
