import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

const DiscussionCreateTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <Flex
    direction='column'
    gap={300}
    justify='flex-start'
    width='27.875rem'
  >
    <Text color={vars.color.Ref.Netural[800]} typo='h2'>{title}</Text>
    {subtitle && <Text color={vars.color.Ref.Netural[500]}>{subtitle}</Text>}
  </Flex>
);

export default DiscussionCreateTitle;