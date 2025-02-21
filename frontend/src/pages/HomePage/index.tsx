import { useNavigate } from '@tanstack/react-router';

import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import FinishedSchedules from '@/features/shared-schedule/ui/FinishedSchedules';
import OngoingSchedules from '@/features/shared-schedule/ui/OngoingSchedules';
import UpcomingSchedules from '@/features/shared-schedule/ui/UpcomingSchedules';

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