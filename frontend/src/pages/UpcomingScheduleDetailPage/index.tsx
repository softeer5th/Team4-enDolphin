import { useParams } from '@tanstack/react-router';

import { Chip } from '@/components/Chip';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import TimelineScheduleModal from '@/features/timeline-schedule/ui';
import { formatDateToDdayString } from '@/utils/date/format';

import Header from './Header';
import { backdropStyle } from './index.css';

interface ScheduleInfo {
  title: string;
  startDateTime: string;
  endDateTime: string;
};

const UpcomingScheduleDetailPage = (scheduleInfo: ScheduleInfo) => {
  const { id } = useParams({ from: '/_main/upcoming-schedule/$id' });
  const start = new Date(scheduleInfo.startDateTime);
  const end = new Date(scheduleInfo.endDateTime);

  return (
    <>
      <div className={backdropStyle} />
      <TimelineScheduleModal
        discussionId={Number(id)}
        isConfirmedSchedule={true}
        {...scheduleInfo}
      >
        <TimelineScheduleModal.TopBar>
          <TopBarContent end={end} scheduleInfo={scheduleInfo} />
        </TimelineScheduleModal.TopBar>
        <TimelineScheduleModal.Header>
          <Header endDateTime={end} startDateTime={start} />
        </TimelineScheduleModal.Header>
      </TimelineScheduleModal>
    </>
  );
};

const TopBarContent = ({ scheduleInfo, end }: { scheduleInfo: ScheduleInfo; end: Date }) => (
  <Flex align='center' gap={200}>
    <Text typo='t1'>{scheduleInfo.title}</Text>
    <Chip
      color='coolGray'
      radius='max'
      size='md'
      variant='weak'
    >
      {formatDateToDdayString(end)}
    </Chip>
  </Flex>
);

export default UpcomingScheduleDetailPage;
