
import Header from './Header';
import { containerStyle } from './index.css';
import Table from './Table';

const DatePicker = () => (
  <div className={containerStyle}>
    <Header />
    <Table />
  </div>
);

export default DatePicker;
