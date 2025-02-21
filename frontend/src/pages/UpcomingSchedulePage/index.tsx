import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { useUpcomingQuery } from '@/features/shared-schedule/api/queries';
import UpcomingCarousel from '@/features/shared-schedule/ui/UpcomingSchedules/UpcomingCarousel';
import UpcomingScheduleList from 
  '@/features/shared-schedule/ui/UpcomingSchedules/UpcomingScheduleList';

import { containerStyle } from './index.css';

const UpcomingSchedulePage = () => {
  const { data, isPending } = useUpcomingQuery();
  if (isPending) return <div>Pending...</div>;
  if (!data) return <div>data is undefined or null</div>;
  const schedules = data.data;

  return (
    <Flex
      className={containerStyle}
      direction='column'
    > 
      <Flex
        direction='column'
        gap={700}
        justify='space-between'
        width='full'
      >
        <Text typo='h2'>다가오는 일정</Text>
        <UpcomingCarousel schedules={schedules.slice(0, 3)} />
      </Flex>
      <UpcomingScheduleList schedules={schedules.slice(3)} />
    </Flex>
  );
};

export default UpcomingSchedulePage;