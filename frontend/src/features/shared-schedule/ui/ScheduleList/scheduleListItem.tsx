import Avatar from '@/components/Avatar';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import {
  detailsContainerStyle, 
  scheduleItemContainerStyle,
  updateIndicatorStyle, 
} from './scheduleListItem.css';

interface ScheduleListItemProps {
  schedule: object;
  selected: boolean;
  // onConfirm: (schedule: Schedule) => void;
}

const ScheduleListItem = ({ schedule, selected }: ScheduleListItemProps) => (
  <Flex
    className={scheduleItemContainerStyle({ selected })}
    direction='column'
    gap={50}
  >
    <Flex
      align='center'
      gap={200}
      height={24}
      justify='flex-start'
    >
      <span className={updateIndicatorStyle} />
      <Text typo='t2'>일정명을 입력해주세요</Text>
      <Text color={vars.color.Ref.Primary[600]} typo='b3M'>일정을 업데이트한 사람이 있어요!</Text>
    </Flex>
    <Flex
      align='center'
      className={detailsContainerStyle}
      justify='space-between'
      width='full'
    >
      <Text color={vars.color.Ref.Netural[600]} typo='b3R'>12월 28일 ~ 1월 23일</Text>
      <Avatar imageUrls={['hi.com', 'hi.com']} size='sm' />
    </Flex>
  </Flex>
);

export default ScheduleListItem;