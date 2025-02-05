import { Flex } from '@/components/Flex';
import { ChevronLeft, ChevronRight } from '@/components/Icon';
import { Text } from '@/components/Text';
import { useSafeContext } from '@/hooks/useSafeContext';
import { vars } from '@/theme/index.css';

import { MonthCalendarContext } from '../MonthCalendarContext';
import { chevronWrapper, headerStyle } from './index.css';

const Header = () => {
  const { 
    baseDate,
    goToPrevMonth,
    goToNextMonth, 
  } = useSafeContext(MonthCalendarContext);
  const currentYear = baseDate.getFullYear();
  const currentMonth = baseDate.getMonth();
  return (
    <div className={headerStyle}>
      <Text typo='b1M'>{`${currentYear}년 ${currentMonth + 1}월`}</Text>
      <Flex direction='row'>
        <span className={chevronWrapper}>
          <ChevronLeft fill={vars.color.Ref.Netural[500]} onClick={goToPrevMonth} />
        </span>
        <span className={chevronWrapper}>
          <ChevronRight fill={vars.color.Ref.Netural[500]} onClick={goToNextMonth} />
        </span>
      </Flex>
    </div>
  );
};

export default Header;