import { Flex } from '@/components/Flex';
import { ChevronLeft, ChevronRight } from '@/components/Icon';
import { Text } from '@/components/Text';
import { useSafeContext } from '@/hooks/useSafeContext';
import { vars } from '@/theme/index.css';
import { getDateParts } from '@/utils/date';

import { DatePickerContext } from '../context/DatePickerContext';
import { chevronWrapper, headerStyle } from './index.css';

const Header = () => {
  const { baseDate, gotoNextMonth, gotoPrevMonth } = useSafeContext(DatePickerContext);
  const { year: currentYear, month: currentMonth } = getDateParts(baseDate);
  return (
    <div className={headerStyle}>
      <Text typo='b1M'>{`${currentYear}년 ${currentMonth + 1}월`}</Text>
      <Flex direction='row'>
        <span className={chevronWrapper}>
          <ChevronLeft
            aria-label='이전 달로 이동'
            clickable={true}
            fill={vars.color.Ref.Netural[500]}
            onClick={gotoPrevMonth}
            onKeyDown={(e) => e.key === 'Enter' && gotoPrevMonth()}
            role='button'
            tabIndex={0}
          />
        </span>
        <span className={chevronWrapper}>
          <ChevronRight
            aria-label='다음 달로 이동'
            clickable={true}
            fill={vars.color.Ref.Netural[500]}
            onClick={gotoNextMonth}
            onKeyDown={(e) => e.key === 'Enter' && gotoNextMonth()}
            role='button'
            tabIndex={0}
          />
        </span>
      </Flex>
    </div>
  );
};

export default Header;