import { TIMES } from '../../../constants/date';
import { sideStyle } from './index.css';
import { SideCell } from './SideCell';

export const CalendarSide = () => (
  <div className={sideStyle}>
    {TIMES.map((time) => <SideCell key={time} time={time} />)}
  </div>
);
