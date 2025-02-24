import { Link, useParams } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import type { PropsWithChildren } from 'react';

import { checkboxAtom } from '@/store/discussion';

import type { DiscussionDTO } from '../../model';
import { linkStyle } from './index.css';

interface DiscussionDetailLinkProps extends PropsWithChildren {
  discussion: DiscussionDTO;
}
const DiscussionDetailLink = ({ discussion, children }: DiscussionDetailLinkProps) => {
  const { id } = useParams({ from: '/_main/discussion/$id' });
  const [checkboxSelectedList] = useAtom(checkboxAtom);
  return (
    <Link
      className={linkStyle}
      params={{ id: id }}
      state={{ candidate: {
        adjustCount: discussion.usersForAdjust.length,
        startDateTime: discussion.startDateTime,
        endDateTime: discussion.endDateTime,
        selectedParticipantIds: checkboxSelectedList ?? undefined,
      } }}
      to='/discussion/candidate/$id'
    >
      {children}
    </Link>
  ); 
};

export default DiscussionDetailLink;
