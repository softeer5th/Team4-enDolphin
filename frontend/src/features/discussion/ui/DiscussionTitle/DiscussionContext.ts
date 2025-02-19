import { createContext } from 'react';

import { useSafeContext } from '@/hooks/useSafeContext';

interface DiscussionContextProps {
  discussionId: number;
}

export const DiscussionContext = createContext<DiscussionContextProps | null>(null);
export const useDiscussionContext = () => useSafeContext(DiscussionContext);
