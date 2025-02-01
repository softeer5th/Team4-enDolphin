import { sideStyle } from '../index.css';
import type { Time } from '../types';
import { SideCell } from './SideCell';

export const CalendarSide = () => {
  const TIMES: Time[] = new Array(24).fill(0).map((_, i) => i);
  return (
    <div className={sideStyle}>
      <SideCell time='empty' />
      {TIMES.map((time) => <SideCell key={time} time={time} />)}
    </div>
  );
};