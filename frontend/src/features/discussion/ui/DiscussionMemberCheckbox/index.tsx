import Button from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Flex } from '@/components/Flex';
import { Group } from '@/components/Group';
import type { UserDTO } from '@/features/user/model';
import { useGroup } from '@/hooks/useGroup';

import { checkboxContainerStyle } from './index.css';
import Title from './Title';

interface DiscussionMemberCheckboxProps {
  members: UserDTO[];
}

const DiscussionMemberCheckbox = ({ members }: DiscussionMemberCheckboxProps) => {
  const groupInfos = useGroup({
    defaultCheckedList: new Set([1, 2]),
    itemIds: members.map(({ id }) => id ),
  });

  const handleClickSearch = () => {
    // console.log(groupInfos.checkedList);
  };
      
  return (
    <Group groupInfos={groupInfos}>
      <Flex
        align='flex-end'
        className={checkboxContainerStyle}
        direction='column'
        gap={400}
        width='14.25rem'
      >
        <Title />
        <Flex
          direction='column'
          gap={400}
          width='100%'
        >
          <Checkbox type='all'>전체</Checkbox>
          {members.map(({ id, name }) => (
            <Checkbox key={id} value={id}>{name}</Checkbox>
          ))}
        </Flex>
        <Button onClick={handleClickSearch} size='lg'>확인</Button>
      </Flex>
    </Group>
  );
};

export default DiscussionMemberCheckbox;