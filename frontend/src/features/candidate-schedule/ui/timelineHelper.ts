import { getMinuteDiff } from '@/utils/date';

// ########## Helpers for Processing Data ##########

const GRID_COLUMN_WIDTH = 34;
const MINUTES_PER_GRID = 30;

const PIXELS_PER_MINUTE = GRID_COLUMN_WIDTH / MINUTES_PER_GRID;

export const calculateMiddleTime = (startTime: Date, endTime: Date): Date => {
  const centerTime = (startTime.getTime() + endTime.getTime()) / 2;
  return new Date(centerTime);
};

const floorToNearestHalfHour = (date: Date, minutesPerGrid: number) => {
  const remainder = date.getMinutes() % 30;
  date.setMinutes(Math.floor(date.getMinutes() / minutesPerGrid) * minutesPerGrid);
  return remainder;
};

export const getGridTimes = (discussionStart: Date, discussionEnd: Date, gridCount = 10) => {
  const gridTimes = [];
  const middleTime = calculateMiddleTime(discussionStart, discussionEnd);
  const gridStart = new Date(middleTime);
  gridStart.setMinutes(gridStart.getMinutes() - MINUTES_PER_GRID * gridCount / 2);

  // grid 크기(30분)에 맞게 gridStart 값을 내림 (이후 이 값을 기준으로 grid의 left 값을 조정)
  
  const floorRemainder = floorToNearestHalfHour(gridStart, MINUTES_PER_GRID);

  for (let i = 0; i < gridCount; i++) {
    const time = new Date(gridStart);
    time.setMinutes(time.getMinutes() + MINUTES_PER_GRID * i);
    gridTimes.push(time);
  }
  return { gridTimes, gridStartOffset: -floorRemainder * PIXELS_PER_MINUTE };
};

// ########## Helpers for Rendering ##########
export const calculateBlockStyle = (
  gridStart: Date,
  blockStart: Date,
  blockEnd: Date,
) => {
  const durationMinutes = getMinuteDiff(blockStart, blockEnd);
  const width = durationMinutes * PIXELS_PER_MINUTE;
  const left = Math.max(getMinuteDiff(gridStart, blockStart) * PIXELS_PER_MINUTE, 0);
  
  return { left, width };
};
