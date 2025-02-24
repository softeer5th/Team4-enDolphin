
import { useNavigate } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import Avatar from '@/components/Avatar';
import { Dropdown } from '@/components/Dropdown';
import { Flex } from '@/components/Flex';
import { Logo } from '@/components/Icon/component/Logo';
import { useUserInfoQuery } from '@/features/user/api/queries';
import { isLogin, logout } from '@/utils/auth';

import { LoginLink, MyCalendarLink, NewDiscussionLink } from './buttons';
import { avatarContainerStyle, containerStyle, dropdownContentsStyle } from './index.css';

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

const UserAvatar = () => {
  const { data, isPending } = useUserInfoQuery();
  const navigate = useNavigate();
  if (isPending) return <div>pending ...</div>;
  if (!data) return <div>user data is undefined or null</div>;

  const handleClickLogout = () => {
    logout();
    navigate({
      to: '/login',
    });
  };

  return (
    <Dropdown
      trigger={
        <Avatar
          className={avatarContainerStyle}
          imageUrls={[data.picture]}
          size='lg'
        />
      }
    >
      <Dropdown.Contents
        className={dropdownContentsStyle}
        height={'fit-content'}
        width={'10rem'}
      >
        <Dropdown.Item onClick={handleClickLogout} value='logout'>
          로그아웃
        </Dropdown.Item>
      </Dropdown.Contents>
    </Dropdown>
  );
};

GlobalNavBar.MyCalendarLink = MyCalendarLink;
GlobalNavBar.NewDiscussionLink = NewDiscussionLink;

export default GlobalNavBar;