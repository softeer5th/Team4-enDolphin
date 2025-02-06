import { Logo } from '@/components/Icon/component/logo';

import { containerStyle } from '../index.css';

const GlobalHeader = () => {
  const a = 1;
  return (
    <header className={containerStyle}>
      <Logo />
    </header>
  );
};

export default GlobalHeader;