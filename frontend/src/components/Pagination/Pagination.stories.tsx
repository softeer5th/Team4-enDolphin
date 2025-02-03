import type { Meta } from '@storybook/react';
import React from 'react';

import Pagination from './index';

const meta: Meta = {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    totalPages: {
      control: { type: 'number', min: 1 },
      defaultValue: 10,
    },
    onPageChange: { action: 'page changed' },
  },
} satisfies Meta<typeof Pagination>;

export default meta;

export const Default = (args: React.ComponentProps<typeof Pagination>) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={(page) => setCurrentPage(page)}
    />
  );
};

Default.args = {
  totalPages: 10,
};
