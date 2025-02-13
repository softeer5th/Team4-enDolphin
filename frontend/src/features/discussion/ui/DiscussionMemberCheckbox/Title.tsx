import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { useGroupContext } from '@/components/Group/GroupContext';
import { Text } from '@/components/Text';

const Title = () => {
  const groupContext = useGroupContext();
  const handleClickReset = () => {
    groupContext?.reset();
  };

  return (
    <Flex
      align='center'
      justify='space-between'
      width='100%'
    >
      <Text>반영할 멤버</Text>
      <Button
        onClick={handleClickReset}
        size='sm'
        style='borderless'
        variant='secondary'
      >
        초기화
      </Button>
    </Flex>
  );
};

export default Title;