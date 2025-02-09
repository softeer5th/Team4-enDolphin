import Avatar from '@/components/Avatar';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import {
  detailsContainerStyle, 
  dotStyle, 
  scheduleItemContainerStyle,
  updateIndicatorStyle, 
} from './scheduleListItem.css';

interface ScheduleListItemProps {
  scheduleTitle: string;
  participantImageUrls: string[];
  selected: boolean;
  isUpdated?: boolean;
  meetingPlace?: string;
  onClick?: () => void;
}

const ScheduleListItem = ({ 
  scheduleTitle,
  participantImageUrls,
  selected,
  isUpdated = false,
  onClick,
}: ScheduleListItemProps) => (
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
      <span className={updateIndicatorStyle({ isUpdated })} />
      <Text typo='t2'>{scheduleTitle}</Text>
      {isUpdated && <Text color={vars.color.Ref.Primary[600]} typo='b3M'>일정을 업데이트한 사람이 있어요!</Text>}
    </Flex>
    <Flex
      align='center'
      className={detailsContainerStyle}
      justify='space-between'
      width='full'
    >
      <Flex gap={200}>
        <Text color={vars.color.Ref.Netural[600]} typo='b3R'>12월 28일 ~ 1월 23일 </Text>
      </Flex>
      <Avatar imageUrls={participantImageUrls} size='sm' />
    </Flex>
  </Flex>
);

export default ScheduleListItem;