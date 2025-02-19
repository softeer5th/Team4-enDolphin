import { useNavigate } from '@tanstack/react-router';

import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import FinishedSchedules from '@/features/shared-schedule/ui/FinishedSchedules';
import OngoingSchedules from '@/features/shared-schedule/ui/OngoingSchedules';
import UpcomingSchedules from '@/features/shared-schedule/ui/UpcomingSchedules';

import { containerStyle } from './index.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={containerStyle}>
      <Flex direction='column' gap={700}>
        <Text typo='h2'>다가오는 일정</Text>
        <UpcomingSchedules>
          <Button
            onClick={() => navigate({ to: '/upcoming-schedule' })}
            style='borderless'
          >
            모두보기
          </Button>
        </UpcomingSchedules>
      </Flex>
      <OngoingSchedules />
      <FinishedSchedules />
    </div>
  );
};

export default HomePage;