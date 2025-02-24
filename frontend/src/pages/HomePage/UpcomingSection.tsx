
import { useNavigate } from '@tanstack/react-router';

import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { useUpcomingQuery } from '@/features/shared-schedule/api/queries';
import UpcomingFallback from '@/features/shared-schedule/ui/Fallbacks/UpcomingFallback';
import UpcomingSchedules from '@/features/shared-schedule/ui/UpcomingSchedules';

const UpcomingSection = () => {
  const { data, isPending } = useUpcomingQuery();
  const schedules = data?.data ?? [];
  const navigate = useNavigate();

  if (isPending) return <Flex height={380} width='full' />;
  if (schedules.length === 0) return <UpcomingFallback />;
  return  (
    <Flex
      direction='column'
      gap={700}
      justify='space-between'
      width='full'
    >
      <Flex justify='space-between' width='full'>
       
        <Text typo='h2'>다가오는 일정</Text>
        {schedules.length > 3 ? 
          <Button
            onClick={() => navigate({ to: '/upcoming-schedule' })}
            style='borderless'
          >
            모두보기
          </Button>          
          : 
          null}
      </Flex>
      <UpcomingSchedules schedules={schedules} />
    </Flex>
  );
};

export default UpcomingSection;
