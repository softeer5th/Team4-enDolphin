import { Link } from '@tanstack/react-router';

import Button from '@/components/Button';
import { Flex } from '@/components/Flex';

import { footerContainerStyle } from './index.css';

const Footer = () => (
  <Flex
    as='footer'
    className={footerContainerStyle}
    justify='flex-start'
    width='100%'
  >
    <Button
      as={Link}
      size='sm'
      target='_blank'
      to='/service/privacy'
    >
      개인정보처리방침
    </Button>
  </Flex>
);

export default Footer;