export const HOUR = 60;

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
