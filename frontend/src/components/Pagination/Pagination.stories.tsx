import type { Meta } from '@storybook/react';
import { useState } from 'react';

import { Pagination } from './index';

const meta: Meta = {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      defaultValue: 3,
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      defaultValue: 10,
    },
    onPageChange: { action: 'page changed' },
  },
} satisfies Meta<typeof Pagination>;

export default meta;

export const Primary = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  return (
    <Pagination
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      totalPages={totalPages}
    />
  );

};