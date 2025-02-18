import Avatar from '@/components/Avatar';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import { getDateRangeString } from '@/utils/date';

import type { OngoingSchedule } from '../../model';
import { 
  detailsContainerStyle,
  scheduleItemContainerStyle,
  updateIndicatorStyle,
} from './ongoingScheduleListItem.css';

interface OngoingScheduleListItemProps {
  schedule: OngoingSchedule;
  selected: boolean;
  isUpdated?: boolean;
  onSelect: (id: number) => void;
}

const OngoingScheduleListItem = ({ 
  schedule,
  selected,
  isUpdated = false,
  onSelect,
}: OngoingScheduleListItemProps) => (
  <Flex
    className={scheduleItemContainerStyle({ selected })}
    direction='column'
    gap={50}
    onClick={() => onSelect(schedule.discussionId)}
  >
    <Flex
      align='center'
      gap={200}
      height={24}
      justify='flex-start'
    >
      <span className={updateIndicatorStyle({ isUpdated })} />
      <Text typo='t2'>{schedule.title}</Text>
      {/* {isUpdated && 
      <Text color={vars.color.Ref.Primary[600]} typo='b3M'>
        일정을 업데이트한 사람이 있어요!
      </Text>} */}
    </Flex>
    <Flex
      align='center'
      className={detailsContainerStyle}
      justify='space-between'
      width='full'
    >
      <Flex gap={200}>
        <Text color={vars.color.Ref.Netural[600]} typo='b3R'>
          {getDateRangeString(schedule.dateRangeStart, schedule.dateRangeEnd)}
        </Text>
      </Flex>
      <Avatar imageUrls={schedule.participantPictureUrls} size='sm' />
    </Flex>
  </Flex>
);

export default OngoingScheduleListItem;