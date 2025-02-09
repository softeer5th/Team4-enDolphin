export const formatDateToTimeString = (date: Date): string => {
  const hours = date.getHours().toString()
    .padStart(2, '0');
  const minutes = date.getMinutes().toString()
    .padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const formatMinutesToTimeString = (minutes: number): string => {
  const hours = Math.floor(minutes / 60).toString();
  const restMinutes = (minutes % 60);
  const minutesString = restMinutes ? ` ${restMinutes.toString().padStart(2, '0')}분` : '';
  const amOrPm = hours >= '12' ? '오후' : '오전';

  return `${amOrPm} ${hours}시${minutesString}`;
};