export const HOUR_IN_MINUTES = 60;
export const HOUR_IN_MILLISECONDS = 1000 * 60 * 60;
export const MINUTE_IN_MILLISECONDS = 60000;

export const formatDateToTimeString = (date: Date | null): string => {
  if (!date) return '';

  const hours = date.getHours().toString()
    .padStart(2, '0');
  const minutes = date.getMinutes().toString()
    .padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const getTimeRangeString = (startDate: Time, endDate: Time): string => {
  const convertTime = (time: Time): string => {
    const { hour, minute } = time;
    const period = hour >= 12 ? '오후' : '오전';
    const hour12 = hour % 12 || 12;
    const paddedMinutes = minute.toString().padStart(2, '0');
    return minute === 0 ? `${period} ${hour12}시` : `${period} ${hour12}시 ${paddedMinutes}분`;
  };

  const startTime = convertTime(startDate);
  const endTime = convertTime(endDate);
  
  return `${startTime} ~ ${endTime}`;
};

export const getMinuteDiff = (startTime: Date, endTime: Date): number => { 
  const MINUTE_IN_MILLISECONDS = 60000;
  const diff = endTime.getTime() - startTime.getTime();
  return Math.floor(diff / MINUTE_IN_MILLISECONDS);
};

export const getTimeDiffString = (
  startTime: Date,
  endTime: Date,
  ignoreDateDiff = true,
): string => {
  const getTotalMinutes = (date: Date): number =>
    date.getHours() * HOUR_IN_MINUTES + date.getMinutes();

  const totalMinutes = ignoreDateDiff
    ? getTotalMinutes(endTime) - getTotalMinutes(startTime)
    : Math.floor((endTime.getTime() - startTime.getTime()) / MINUTE_IN_MILLISECONDS);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formattedHours = hours > 0 ? `${hours}시간` : '';
  const formattedMinutes = minutes > 0 ? `${minutes}분` : '';

  // 빈 문자열 제거
  const timeParts = [formattedHours, formattedMinutes].filter(Boolean);

  return timeParts.join(' ') || '0분';
};

export const getTimeParts = (date: Date): Time => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return { hour, minute, second };
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
