import { useNavigate } from '@tanstack/react-router';

import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import { Dropdown } from '@/components/Dropdown';
import { Flex } from '@/components/Flex';
import Input from '@/components/Input';
import { useUserInfoQuery } from '@/features/user/api/queries';
import { useFormRef } from '@/hooks/useFormRef';
import { useGlobalModal } from '@/store/global/modal';
import { logout } from '@/utils/auth';

import { 
  avatarContainerStyle,
  dropdownContentsStyle,
  nicknameModalContentsStyle, 
  nicknameModalStyle, 
} from './index.css';

const ModalContents = () => {
  const { valuesRef } = useFormRef({
    nickname: '',
  });

  return (
    <Flex
      align='center'
      className={nicknameModalContentsStyle}
      gap={400}
    >
      <Input.Single
        inputProps={{
          name: 'nickname',
          value: valuesRef.current.nickname,
        }}
        placeholder='닉네임을 입력해주세요'
        type='text'
      />
      <Button size='lg'>저장하기</Button>
    </Flex>
  );
};

const HeaderDropdown = () => {
  const { createModal } = useGlobalModal();
  const navigate = useNavigate();

  const handleClickLogout = () => {
    logout();
    navigate({
      to: '/login',
    });
  };
  
  const handleOpenModal = () => {
    createModal({ 
      title: '닉네임 변경', 
      subTitle: '언제만나에서 사용할 닉네임을 입력해주세요!',
      className: nicknameModalStyle,
      children: <ModalContents />,
    });
  };
      
  return (
    <Dropdown.Contents
      className={dropdownContentsStyle}
      height={'fit-content'}
      width={'10rem'}
    >
      <Dropdown.Item onClick={handleClickLogout} value='logout'>
        로그아웃
      </Dropdown.Item>
      <Dropdown.Item onClick={handleOpenModal} value='nickname'>
        닉네임 변경
      </Dropdown.Item>
    </Dropdown.Contents>
  );
};

export const UserAvatar = () => {
  const { data, isPending } = useUserInfoQuery();
  
  return (
    <Dropdown
      trigger={
        <Avatar
          className={avatarContainerStyle}
          imageUrls={[!isPending && data ? data.picture : null]}
          size='lg'
        />
      }
    >
      <HeaderDropdown />
    </Dropdown>
  );
};
  