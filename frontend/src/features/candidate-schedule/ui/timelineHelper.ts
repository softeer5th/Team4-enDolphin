import { getMinuteDiff } from '@/utils/date';

// ########## Helpers for Processing Data ##########

export const calculateMiddleTime = (startTime: Date, endTime: Date): Date => {
  const centerTime = (startTime.getTime() + endTime.getTime()) / 2;
  return new Date(centerTime);
};

export const getGridTimes = (discussionStart: Date, discussionEnd: Date, gridCount = 10) => {
  const MINUTES_PER_GRID = 30;
  const gridTimes = [];
  const time = calculateMiddleTime(discussionStart, discussionEnd);
  time.setMinutes(time.getMinutes() - MINUTES_PER_GRID * gridCount / 2);
  for (let i = 0; i < gridCount; i++) {
    gridTimes.push(new Date(time));
    time.setMinutes(time.getMinutes() + MINUTES_PER_GRID);
  }
  return gridTimes;
};

// ########## Helpers for Rendering ##########
export const calculateBlockStyle = (
  gridStart: Date,
  blockStart: Date,
  blockEnd: Date,
) => {
  const BLOCK_WIDTH = 34;
  const BLOCK_WIDTH_PER_MINUTE = BLOCK_WIDTH / 30;
  const durationMinutes = getMinuteDiff(blockStart, blockEnd);
  const width = durationMinutes * BLOCK_WIDTH_PER_MINUTE;
  
  const left = Math.max(getMinuteDiff(gridStart, blockStart) * BLOCK_WIDTH_PER_MINUTE, 0);
  
  return { left, width };
};
