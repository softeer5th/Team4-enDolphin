import { createFileRoute, Link, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({
      to: '/landing',
    });
  },
});
