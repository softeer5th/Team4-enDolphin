import type { Meta } from '@storybook/react';
import React, { useState } from 'react';

import { Input } from './index';

const meta: Meta = {
  title: 'Input',
  component: Input,
  argTypes: {
    state: {
      control: 'radio',
      options: ['neutral', 'error'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

export const Primary = () => {
  const [value, setValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  return (
    <Input 
      multiInput={false}
      size='md'
      state='neutral'
    >
      <Input.Label required={true}>이메일</Input.Label>
      <Input.InputField 
        onChange={handleChange}
        placeholder='이메일을 입력하세요'
        value={value}
      />
      <Input.HelperText.Hint>힌트</Input.HelperText.Hint>
      <Input.HelperText.Error>에러</Input.HelperText.Error>
    </Input>
  );
};

export const Error = () => {
  const [value, setValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  return (
    <Input 
      multiInput={false}
      size='md'
      state='error'
    >
      <Input.Label required={false}>이메일</Input.Label>
      <Input.InputField 
        onChange={handleChange}
        placeholder='이메일을 입력하세요'
        value={value}
      />
      <Input.HelperText.Hint>힌트</Input.HelperText.Hint>
      <Input.HelperText.Error>에러</Input.HelperText.Error>
    </Input>
  );
};

// export const ErrorState = () => {
//   const [value, setValue] = useState('');
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

//   return (
//     <Input 
//       onChange={handleChange}
//       placeholder='이메일을 입력하세요'
//       required={true}
//       state='error'
//       value={value}
//     />
//   );
// };

// export const WithHelperText = () => {
//   const [value, setValue] = useState('');
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

//   return (
//     <Input 
//       onChange={handleChange}
//       placeholder='이메일을 입력하세요'
//       required={false}
//       state='neutral'
//       value={value}
//     >
//       <Input.HelperText>이메일을 입력해주세요.</Input.HelperText>
//     </Input>
//   );
// };
