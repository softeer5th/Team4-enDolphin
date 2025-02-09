import type { Meta } from '@storybook/react';

import Button from '../Button';
import { Chip } from '../Chip';
import type { ModalProps } from '.';
import { Modal } from '.';
import { useModalContext } from './ModalContext';
import { ModalProvider } from './ModalProvider';

const meta: Meta = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    type: {
      options: ['default', 'error'],
      control: 'radio',
    },
    subTitle: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    isOpen: {
      control: false,
    },
    className: {
      control: 'text',
    },
  },
  args: {
    type: 'default',
    subTitle: '로그인/회원가입',
    title: '언제 만나 시작하기',
    description: 
      'Google 계정으로 간편하게 가입하고, 팀 프로젝트 일정 관리와 협업을 시작해보세요. ’언제만나?’는 대학생을 위한 최고의 팀플 관리 도구입니다!',
    isOpen: true,
  },
  decorators: [
    (Story) => (
      <ModalProvider>
        <Story />
      </ModalProvider>
    ),
  ],
} satisfies Meta<typeof Modal>;

export default meta;

export const Default = (args: ModalProps) => (
  <Modal
    {...args}
  >
    <Modal.Footer>
      <Button size='xl' style='borderless'>다시 일정 조율하기</Button>
      <Button size='xl'>내 캘린더 확인하기</Button>
    </Modal.Footer>
  </Modal>
);

export const WithContents = () => (
  <Modal
    isOpen
    subTitle='{User_name}님이 일정 조율에 초대했어요!'
    title='기업디(3) 첫 팀플'
  >
    <Modal.Contents>
      <Chip color='black'>12월 28일 ~ 1월 23일</Chip>
      <Chip color='black'>12월 28일 ~ 1월 23일</Chip>
      <Chip color='black'>12월 28일 ~ 1월 23일</Chip>
    </Modal.Contents>
    <Modal.Footer>
      <Button size='xl'>초대 수락하기</Button>
    </Modal.Footer>
  </Modal>
);

export const WithContext = () => {
  const { createModal } = useModalContext();

  const handleClickCreateModal = () => {
    createModal({ title: '모달 테스트', subTitle: '모달 테스트' });
  };

  return (
    <Button onClick={handleClickCreateModal}>모달 열기</Button>
  );
};