
import { useNavigate } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import Avatar from '@/components/Avatar';
import { Flex } from '@/components/Flex';
import { Logo } from '@/components/Icon/component/Logo';

import { LoginLink, MyScheduleLink, NewDiscussionLink } from './buttons';
import { containerStyle } from './index.css';

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
      <Logo clickable={true} onClick={onClickLogo} />
      <Flex direction='row'>
        {children}
      </Flex>
    </header>
  );
};

// TODO: 로그인 상태에 따라 로그인 버튼 | 다른 버튼들 + 아바타 표시
GlobalNavBar.LoginLink = LoginLink;
GlobalNavBar.MyScheduleLink = MyScheduleLink;
GlobalNavBar.NewDiscussionLink = NewDiscussionLink;
GlobalNavBar.Avatar = Avatar;

export default GlobalNavBar;