
import FinishedSchedules from '@/features/shared-schedule/ui/FinishedSchedules';
import OngoingSchedules from '@/features/shared-schedule/ui/OngoingSchedules';

import { containerStyle } from './index.css';
import UpcomingSection from './UpcomingSection';

const HomePage = () => (
  <div className={containerStyle}>
    <UpcomingSection />
    <OngoingSchedules />
    <FinishedSchedules />
  </div>
);

export default HomePage;