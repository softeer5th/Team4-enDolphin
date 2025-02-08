import UnConfirmedSchedules from '@/features/shared-schedule/ui/UnConfirmedSchedules';
import UpcomingSchedules from '@/features/shared-schedule/ui/UpcomingSchedules';

import { containerStyle } from './index.css';

const HomePage = () => {
  const tmp = 1;
  return (
    <div className={containerStyle}>
      <UpcomingSchedules schedules={[]} />
      <UnConfirmedSchedules />
    </div>
  );
};

export default HomePage;