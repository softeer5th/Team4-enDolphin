const HOUR = 60;

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

export const formatMinutesToTimeString = (minutes: number): string => {
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

export const getMinuteDiff = (startTime: Date, endTime: Date): number => { 
  const MINUTE_IN_MILLISECONDS = 60000;
  const diff = endTime.getTime() - startTime.getTime();
  return Math.floor(diff / MINUTE_IN_MILLISECONDS);
};