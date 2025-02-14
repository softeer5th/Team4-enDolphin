import { getMinuteDiff } from '@/utils/date';

import type { ScheduleEvent } from '../../model';

// ########## Helpers for Processing Data ##########

export const calculateMiddleTime = (startTime: Date, endTime: Date): Date => {
  const centerTimestamp = (startTime.getTime() + endTime.getTime()) / 2;
  return new Date(centerTimestamp);
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
  gridEnd: Date,
  event: ScheduleEvent,
  gridCount = 20,
) => {
  const BLOCK_WIDTH = 34;
  const BLOCK_WIDTH_PER_MINUTE = BLOCK_WIDTH / 30;
  const totalGridWidth = gridCount * BLOCK_WIDTH;
  
  const left = Math.max(getMinuteDiff(gridStart, event.startDateTime) * BLOCK_WIDTH_PER_MINUTE, 0);
  const right = Math.max(getMinuteDiff(event.endDateTime, gridEnd) * BLOCK_WIDTH_PER_MINUTE, 0);
  const width = totalGridWidth - left - right;
  return { left, right, width };
};
