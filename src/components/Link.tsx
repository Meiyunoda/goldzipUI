import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import * as React from 'react';

const Link = React.forwardRef((props: LinkProps, ref) => (
  <>
    {' '}
    <NextLink href={props.href || '/'} passHref>
      <ChakraLink _hover={{ color: 'gold' }} {...props}>
        {props.children}
      </ChakraLink>
    </NextLink>
    {' '}
  </>
));

export default Link;