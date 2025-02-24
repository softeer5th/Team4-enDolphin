import { useNavigate } from '@tanstack/react-router';

import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import { Dropdown } from '@/components/Dropdown';
import { Flex } from '@/components/Flex';
import Input from '@/components/Input';
import { Text } from '@/components/Text';
import { useNicknameMutation } from '@/features/user/api/mutations';
import { useUserInfoQuery } from '@/features/user/api/queries';
import { useFormRef } from '@/hooks/useFormRef';
import { useGlobalModal } from '@/store/global/modal';
import { logout } from '@/utils/auth';

import { 
  avatarContainerStyle,
  dropdownContentsStyle,
  nicknameModalContentsStyle, 
  nicknameModalStyle,
  nicknameTextStyle, 
} from './index.css';

const ModalContents = ({ name }: { name?: string }) => {
  const { mutate } = useNicknameMutation();
  const { onModalClose } = useGlobalModal();
  const { valuesRef, handleChange } = useFormRef({
    nickname: '',
  });

  const handleClickChangeNickname = () => {
    mutate({ name: valuesRef.current.nickname });
    onModalClose();
  };

  return (
    <Flex
      align='center'
      className={nicknameModalContentsStyle}
      gap={400}
    >
      <Input.Single
        inputProps={{
          defaultValue: name,
          name: 'nickname',
          onChange: (e) => handleChange({ name: 'nickname', value: e.target.value }),
        }}
        placeholder='닉네임을 입력해주세요'
        type='text'
      />
      <Button onClick={handleClickChangeNickname} size='lg'>저장하기</Button>
    </Flex>
  );
};

const HeaderDropdown = () => {
  const { createModal } = useGlobalModal();
  const { data } = useUserInfoQuery();
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
      children: <ModalContents name={data?.name} />,
    });
  };
      
  return (
    <Dropdown.Contents
      className={dropdownContentsStyle}
      height={'fit-content'}
      style={{ top: '3.5rem' }}
      width={'10rem'}
    >
      <Text className={nicknameTextStyle} typo='t2'>{data?.name}</Text>
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
  