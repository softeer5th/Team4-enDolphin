
import { Logo } from '@/components/Icon/component/logo';

import { containerStyle } from '../index.css';
import MyScheduleLink from './MySceduleLink';

const GlobalHeader = () => (
  <header className={containerStyle}>
    <Logo />
    <div>
      <MyScheduleLink />
    </div>
  </header>
);

export default GlobalHeader;