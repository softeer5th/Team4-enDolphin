import { useNavigate } from '@tanstack/react-router';

import Button from '@/components/Button';
import { Text } from '@/components/Text';
import FinishedSchedules from '@/features/shared-schedule/ui/FinishedSchedules';
import OngoingSchedules from '@/features/shared-schedule/ui/OngoingSchedules';
import UpcomingSchedules from '@/features/shared-schedule/ui/UpcomingSchedules';

import { containerStyle } from './index.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={containerStyle}>
      <UpcomingSchedules>
        <Text typo='h2'>다가오는 일정</Text>
        <Button
          onClick={() => navigate({ to: '/upcoming-schedule' })}
          style='borderless'
        >
          모두보기
        </Button>
      </UpcomingSchedules>
      <OngoingSchedules />
      <FinishedSchedules />
    </div>
  );
};

export default HomePage;