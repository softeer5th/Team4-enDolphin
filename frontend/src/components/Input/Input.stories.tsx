import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { vars } from '../../theme/index.css';
import { Check } from '../Icon';
import { Input } from './index';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    isValid: {
      control: 'boolean',
      description: '입력 필드 유효성',
    },
    label: {
      control: 'text',
      description: '입력 필드 라벨',
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
    },
    separator: {
      control: 'text',
      description: '입력 필드 사이 구분자',
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
} satisfies Meta<typeof Input>;

export default meta;

export const Default: StoryObj<typeof Input> = {
  args: {
    label: '이메일',
    isValid: true,
    required: true,
    hint: '이메일을 입력하세요',
    error: '이메일 형식이 아닙니다',
  },
  render: (args) => (
    <Input {...args}>
      <Input.InputField
        placeholder='이메일을 입력하세요'
      />
    </Input>
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
    <Input 
      isValid={true}
      label='시간'
      required={true}
      separator='~'
    >
      <Input.InputField 
        onChange={handleFirstChange}
        placeholder='시작 시간을 입력하세요'
        value={firstValue}
      />
      <Input.InputField 
        onChange={handleSecondChange}
        placeholder='종료 시간을 입력하세요'
        value={secondValue}
      />
    </Input>
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
    <Input 
      isValid={true}
      label='이메일'
      required={true}
      separator={<Check fill={vars.color.Ref.Netural[500]}/>}    >
      <Input.InputField 
        onChange={handleFirstChange}
        placeholder='이메일을 입력하세요'
        value={firstValue}
      />
      <Input.InputField 
        onChange={handleSecondChange}
        placeholder='이메일을 입력하세요'
        value={secondValue}
      />
    </Input>
  );
};
