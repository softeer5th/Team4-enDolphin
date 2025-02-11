
import { useNavigate } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import Avatar from '@/components/Avatar';
import { Flex } from '@/components/Flex';
import { Logo } from '@/components/Icon/component/Logo';

import { LoginLink, MyCalendarLink, NewDiscussionLink } from './buttons';
import { containerStyle } from './index.css';

interface GlobalNavBarProps extends PropsWithChildren {
  type?: 'white' | 'transparent';
} 

const GlobalNavBar = ({ type, children }: GlobalNavBarProps) => {
  const navigate = useNavigate();

  const onClickLogo = () => {
    navigate({ to: '/', replace: true });
  };

  return (
    <header className={containerStyle({ type })}>
      <Logo
        clickable={true}
        height={22}
        onClick={onClickLogo}
        width={80}
      />
      <Flex direction='row'>
        {children}
      </Flex>
    </header>
  );
};

GlobalNavBar.LoginLink = LoginLink;
GlobalNavBar.MyCalendarLink = MyCalendarLink;
GlobalNavBar.NewDiscussionLink = NewDiscussionLink;
GlobalNavBar.Avatar = Avatar;

export default GlobalNavBar;