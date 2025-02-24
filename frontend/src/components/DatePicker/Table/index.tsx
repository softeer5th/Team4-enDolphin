
import { calendarContainerStyle } from './index.css';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

const Table = () => (
  <div className={calendarContainerStyle}>
    <TableHeader />
    <TableBody />
  </div>
);

export default Table;