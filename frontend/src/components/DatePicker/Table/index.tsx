
import { calendarStyle } from './index.css';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

const Table = () => (
  <div className={calendarStyle}>
    <TableHeader />
    <TableBody />
  </div>
);

export default Table;