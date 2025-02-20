
import { useNavigate } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import Avatar from '@/components/Avatar';
import { Flex } from '@/components/Flex';
import { Logo } from '@/components/Icon/component/Logo';
import { useUserInfoQuery } from '@/features/user/api/queries';
import { isLogin } from '@/utils/auth';

import { LoginLink, MyCalendarLink, NewDiscussionLink } from './buttons';
import { containerStyle } from './index.css';

interface GlobalNavBarProps extends PropsWithChildren {
  background?: 'white' | 'transparent';
}

const GlobalNavBar = ({ background = 'white', children }: GlobalNavBarProps) => {
  const navigate = useNavigate();
  const { data, isPending } = useUserInfoQuery();
  if (isPending) return <div>pending ...</div>;
  if (!data) return <div>user data is undefined or null</div>;

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
            gap={300}
          >
            {children}
            <Avatar imageUrls={[data.picture]} size='lg' />
          </Flex>
          :
          <LoginLink />}
      </Flex>
    </header>
  );
};

// TODO: 로그인 상태에 따라 로그인 버튼 | 다른 버튼들 + 아바타 표시
GlobalNavBar.LoginLink = LoginLink;
GlobalNavBar.MyCalendarLink = MyCalendarLink;
GlobalNavBar.NewDiscussionLink = NewDiscussionLink;
GlobalNavBar.Avatar = Avatar;

export default GlobalNavBar;