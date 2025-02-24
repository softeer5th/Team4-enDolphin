
import { useNavigate } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import { Flex } from '@/components/Flex';
import { Logo } from '@/components/Icon/component/Logo';
import { isLogin } from '@/utils/auth';

import { LoginLink, MyCalendarLink, NewDiscussionLink } from './buttons';
import { containerStyle } from './index.css';
import { UserAvatar } from './UserAvatar';

interface GlobalNavBarProps extends PropsWithChildren {
  background?: 'white' | 'transparent';
}

const GlobalNavBar = ({ background = 'white', children }: GlobalNavBarProps) => {
  const navigate = useNavigate();

  const onClickLogo = () => {
    navigate({ to: '/', replace: true });
  };

  return (
    <header className={containerStyle({ background })}>
      <Logo
        clickable={true}
        height={22}
        onClick={onClickLogo}
        width={80}
      />
      <Flex direction='row'>
        {isLogin() ? 
          <Flex
            align='center'
            direction='row'
          >
            {children}
            <UserAvatar />
          </Flex>
          :
          <LoginLink />}
      </Flex>
    </header>
  );
};

GlobalNavBar.MyCalendarLink = MyCalendarLink;
GlobalNavBar.NewDiscussionLink = NewDiscussionLink;

export default GlobalNavBar;