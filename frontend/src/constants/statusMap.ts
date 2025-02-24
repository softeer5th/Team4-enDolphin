export type AdjustmentStatus = 'adjustable' | 'fixed';

export const adjustmentStatusMap: Record<AdjustmentStatus, {
  color: 'green' | 'red';
  label: string;
}> = {
  adjustable: {
    color: 'green',
    label: '조정 가능',
  },
  fixed: {
    color: 'red',
    label: '조정 불가능',
  },
};
  