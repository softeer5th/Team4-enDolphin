import { Flex } from '@/components/Flex';
import UpcomingSchedules from '@/features/shared-schedule/ui/UpcomingSchedules';

import { containerStyle } from './index.css';

const HomePage = () => {
  const tmp = 1;
  return (
    <Flex className={containerStyle}>
      <UpcomingSchedules schedules={[]} />
    </Flex>
  );
};

export default HomePage;