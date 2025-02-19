import { useParams } from '@tanstack/react-router';

import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import { useDiscussionQuery } from '../../api/queries';
import { DiscussionBadges } from './DiscussionBadges';
import { DiscussionContext } from './DiscussionContext';
import { titleStyle } from './index.css';

const DiscussionTitle = () => {
  const params: { id: string } = useParams({ from: '/_main/discussion/$id' });
  const { discussion, isLoading } = useDiscussionQuery(params.id);
  return (
    <DiscussionContext.Provider value={{ discussionId: Number(params.id) }}>
      <Flex
        align='flex-start'
        className={titleStyle}
        direction='column'
        gap={200}
        width='100%'
      >
        {!isLoading && (
          <>
            <Text color={vars.color.Ref.Netural[900]} typo='h2'>
              {discussion?.title}
              {' '}
              일정 조율 결과
            </Text>
            <DiscussionBadges discussion={discussion} />
          </>
        )}
      </Flex>
    </DiscussionContext.Provider>
  );
};

export default DiscussionTitle;