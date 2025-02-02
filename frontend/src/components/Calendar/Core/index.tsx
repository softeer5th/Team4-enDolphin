import { containerStyle } from './index.css';
import { SelectedWeek } from './SelectedWeek';
import { TimeControl } from './TimeControl';

export const Core = () => (
  <div className={containerStyle}>
    <TimeControl />
    <SelectedWeek />
  </div>
);