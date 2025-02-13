import { TIME_HEIGHT } from '@/constants/date';

export const calcPositionByDate = (date: Date | null) => {
  if (!date) return { x: 0, y: 0 };

  const day = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const height = TIME_HEIGHT * hour + TIME_HEIGHT * (minute / 60);

  return { x: day, y: height };
};