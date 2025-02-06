import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { vars } from '../../theme/index.css';
import { Check } from '../Icon';
import { Input } from './index';

const meta: Meta<typeof Input.Single> = {
  title: 'Components/Input',
  component: Input.Single,
  argTypes: {
    isValid: {
      control: 'boolean',
      description: '입력 필드 유효성',
    },
    type: {
      control: 'radio',
      description: '입력 필드 타입',
      options: ['text', 'select'],
    },
    label: {
      control: 'text',
      description: '입력 필드 라벨',
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
    },
    hint: {
      control: 'text',
      description: '힌트 메시지',
    },
    error: {
      control: 'text',
      description: '에러 메시지',
    },
  },
} satisfies Meta<typeof Input.Single>;

export default meta;

export const Default: StoryObj<typeof Input.Single> = {
  args: {
    label: '이메일',
    isValid: true,
    required: true,
    hint: '이메일을 입력하세요',
    error: '이메일 형식이 아닙니다',
    type: 'text',
    placeholder: '이메일을 입력하세요',
  },
  render: (args) => (
    <Input.Single {...args} />
  ),
};

export const MultiInput = () => {
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const handleFirstChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    setFirstValue(e.target.value);
  const handleSecondChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSecondValue(e.target.value);

  return (
    <Input.Multi
      borderPlacement='inputField'
      isValid={true}
      label='시간'
      required={true}
      separator='~'
      type='text'
    >
      <Input.Multi.InputField 
        onChange={handleFirstChange}
        placeholder='시작 시간을 입력하세요'
        value={firstValue}
      />
      <Input.Multi.InputField 
        onChange={handleSecondChange}
        placeholder='종료 시간을 입력하세요'
        value={secondValue}
      />
    </Input.Multi>
  );
};

export const CustomSeparatorIcon = () => {
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const handleFirstChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    setFirstValue(e.target.value);
  const handleSecondChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSecondValue(e.target.value);

  return (
    <Input.Multi
      borderPlacement='container'
      isValid={true}
      label='시간'
      required={true}
      separator={<Check fill={vars.color.Ref.Netural[600]} />}
      type='text'
    >
      <Input.Multi.InputField 
        onChange={handleFirstChange}
        placeholder='시작 시간을 입력하세요'
        value={firstValue}
      />
      <Input.Multi.InputField 
        onChange={handleSecondChange}
        placeholder='종료 시간을 입력하세요'
        value={secondValue}
      />
    </Input.Multi>
  );
};
