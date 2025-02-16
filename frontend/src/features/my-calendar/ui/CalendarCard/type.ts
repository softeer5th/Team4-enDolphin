import type { CSSProperties } from 'react';

import type { AdjustmentStatus } from '@/constants/statusMap';

export interface CalendarCardProps {
  id: number;
  status: AdjustmentStatus; 
  size?: 'sm' | 'md' | 'lg';
  title: string;
  startTime: Date | null;
  endTime: Date | null;
  style: CSSProperties;
  onClickEdit?: () => void;
}