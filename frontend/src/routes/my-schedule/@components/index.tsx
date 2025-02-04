import { CalendarCard } from './CalendarCard';

const MySchedule = () => 
  <div style={{ width: '174px' }}>
    <CalendarCard
      endTime={new Date()}
      startTime={new Date()}
      status='fixed'
      title='title'
    />
  </div>;

export default MySchedule;