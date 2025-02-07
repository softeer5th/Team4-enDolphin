
import { useNavigate } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import { Flex } from '@/components/Flex';
import { Logo } from '@/components/Icon/component/Logo';

import { containerStyle } from './index.css';

const GlobalNavBar = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const onClickLogo = () => {
    navigate({ to: '/', replace: true });
  };

  return (
    <header className={containerStyle}>
      <Logo clickable={true} onClick={onClickLogo} />
      <Flex direction='row'>
        {children}
      </Flex>
    </header>
  );
};

export default GlobalNavBar;