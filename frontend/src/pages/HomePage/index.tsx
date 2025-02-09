import ExpiredSchedules from '@/features/shared-schedule/ui/ExpiredSchedules';
import UnConfirmedSchedules from '@/features/shared-schedule/ui/UnConfirmedSchedules';
import UpcomingSchedules from '@/features/shared-schedule/ui/UpcomingSchedules';

import { containerStyle } from './index.css';

const HomePage = () => (
  <div className={containerStyle}>
    <UpcomingSchedules schedules={[]} />
    <UnConfirmedSchedules />
    <ExpiredSchedules />
  </div>
);

export default HomePage;