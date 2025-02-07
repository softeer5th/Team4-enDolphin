import { Link } from '@tanstack/react-router';

import Button from '@/components/Button';

export const NewDiscussionLink = () => (
  <Button
    as={Link}
    radius='roundCorner'
    size='md'
    style='filled'
    to='/new-discussion'
    variant='primary'
  >
    새 일정 조율 추가
  </Button>
);

export default NewDiscussionLink;