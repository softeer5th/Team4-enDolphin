export const formatDateToTimeString = (date: Date): string => {
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
  const hours = Math.floor(minutes / 60);
  const restMinutes = (minutes % 60);
  const minutesString = restMinutes ? ` ${restMinutes.toString().padStart(2, '0')}분` : '';
  const amOrPm = hours >= 12 ? '오후' : '오전';

  return `${amOrPm} ${hours}시${minutesString}`;
};

export const formatNumberToTimeString = (number: number): string => {
  const hours = Math.floor(number / 100).toString();
  const minutes = (number % 100).toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const formatTimeStringToNumber = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':');
  return Number(hours) * 60 + Number(minutes);
};