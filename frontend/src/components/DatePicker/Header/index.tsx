import { ChevronLeft, ChevronRight } from '@/components/Icon';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import { chevronWrapperStyle, headerStyle } from './index.css';

const Header = () => (

  <div className={headerStyle}>
    <Text typo='b1M'>2024년 12월</Text>
    <span className={chevronWrapperStyle}>
      <ChevronLeft fill={vars.color.Ref.Netural[500]} />
    </span>
    <span className={chevronWrapperStyle}>
      <ChevronRight fill={vars.color.Ref.Netural[500]} />
    </span>
  </div>
);

export default Header;