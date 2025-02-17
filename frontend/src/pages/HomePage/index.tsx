import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import Button from '@/components/Button';
import { Text } from '@/components/Text';
import {
  prefetchFinishedSchedules,
  prefetchOngoingSchedules,
  prefetchUpcomingSchedules,
} from '@/features/shared-schedule/api/prefetch';
import ExpiredSchedules from '@/features/shared-schedule/ui/ExpiredSchedules';
import UnConfirmedSchedules from '@/features/shared-schedule/ui/UnConfirmedSchedules';
import UpcomingSchedules from '@/features/shared-schedule/ui/UpcomingSchedules';

import { containerStyle } from './index.css';

const HomePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    prefetchUpcomingSchedules(queryClient);
    prefetchOngoingSchedules(queryClient);
    prefetchFinishedSchedules(queryClient);
  });

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
      <UnConfirmedSchedules />
      <ExpiredSchedules />
    </div>
  );
};

export default HomePage;