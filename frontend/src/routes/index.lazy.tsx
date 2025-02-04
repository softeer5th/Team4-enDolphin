import { createLazyFileRoute, Link } from '@tanstack/react-router';

const Home = () => (
  <div>
    Home
    <Link to='/my-schedule'>내 일정</Link>
  </div>
);

export const Route = createLazyFileRoute('/')({
  component: Home,
});