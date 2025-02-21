import { getMinuteDiff, MINUTE_IN_MILLISECONDS } from '@/utils/date';

import type { Participant } from '../model';

const GRID_COLUMN_WIDTH = 34;
const MINUTES_PER_GRID = 30;
const GRID_HORIZONTAL_COUNT = 20;

const PIXELS_PER_MINUTE = GRID_COLUMN_WIDTH / MINUTES_PER_GRID;

// ########## Helpers for Processing Data ##########

export const splitParticipantsBySelection = (
  participants: Participant[], selectedParticipantIds?: number[],
) => {
  if (!selectedParticipantIds) {
    return { checkedParticipants: participants, uncheckedParticipants: [] };
  }

  const uncheckedParticipants: Participant[] = [];
  const checkedParticipants: Participant[] = [];
  participants.forEach(participant => {
    if (selectedParticipantIds.includes(participant.id)) {
      checkedParticipants.push(participant);
    } else {
      uncheckedParticipants.push(participant);
    }
  });
  
  return { checkedParticipants, uncheckedParticipants };
};

export const calculateMiddleTime = (startTime: Date, endTime: Date): Date => {
  const centerTime = (startTime.getTime() + endTime.getTime()) / 2;
  return new Date(centerTime);
};

const floorToNearestHalfHour = (date: Date, minutesPerGrid: number) => {
  const remainder = date.getMinutes() % 30;
  date.setMinutes(Math.floor(date.getMinutes() / minutesPerGrid) * minutesPerGrid);
  return remainder;
};

export const getGridTimes = (discussionStart: Date, discussionEnd: Date) => {
  const gridTimes = [];
  const middleTime = calculateMiddleTime(discussionStart, discussionEnd);
  const gridStart = new Date(middleTime);
  gridStart.setMinutes(gridStart.getMinutes() - MINUTES_PER_GRID * GRID_HORIZONTAL_COUNT / 2);

  // grid 크기(30분)에 맞게 gridStart 값을 내림 (이후 이 값을 기준으로 grid의 left 값을 조정)
  const floorRemainder = floorToNearestHalfHour(gridStart, MINUTES_PER_GRID);

  for (let i = 0; i < GRID_HORIZONTAL_COUNT; i++) {
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
  // Clamp block start and end within the grid's boundaries
  const clampedBlockStart = new Date(Math.max(blockStart.getTime(), gridStart.getTime()));
  const gridEndTime = 
    gridStart.getTime() + GRID_HORIZONTAL_COUNT * MINUTES_PER_GRID * MINUTE_IN_MILLISECONDS;
  const clampedBlockEnd = new Date(Math.min(blockEnd.getTime(), gridEndTime));

  const durationMinutes = getMinuteDiff(clampedBlockStart, clampedBlockEnd);
  const width = durationMinutes * PIXELS_PER_MINUTE;
  const left = getMinuteDiff(gridStart, clampedBlockStart) * PIXELS_PER_MINUTE;
  
  return { left, width };
};

export const getRowTopOffset = (participantCount: number) => {
  const HEIGHT = 68;
  const GAP = 8;
  
  return HEIGHT * participantCount + GAP * participantCount;
};
