import {
    ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon
} from '@chakra-ui/icons';
import {
    Box, Button, Collapse, Flex, Icon, IconButton, Popover, PopoverBody, PopoverContent, PopoverTrigger, Portal, Spinner, Stack, Text, useDisclosure, VStack
} from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Link from '../Link';

const Logo = () => <Link href={'/'} p={2}>
    <img src='/goldzip-logo.svg' />
</Link >;


const UserAuthButton = () => {
    const [auth, isAuthLoading] = useSession();
    const router = useRouter();

    if (isAuthLoading) return <Button>
        <Spinner />
    </Button>;
    if (!auth) return (
        <Button
            // as={Link} href={'/login'}
            onClick={() => signIn('cognito')}
            color={'black'} bg={'white'} _hover={{
                color: 'black',
                bg: 'gold',
            }}
        >
            Log In
        </Button>
    );
    return (
        <Popover placement="bottom" >
            <PopoverTrigger>
                <Button color={'black'} bg={'white'} _hover={{
                    color: 'black',
                    bg: 'gold',
                }}>{auth.user.email}</Button>
            </PopoverTrigger>

            <Portal>
                <PopoverContent>
                    <PopoverBody>
                        <VStack>
                            <Button variant={'link'} onClick={() => {
                                signOut({ redirect: false });
                                router.push(`https://${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/login?response_type=code&scope=openid%20profile%20email&redirect_uri=${window.location.origin}%2Fapi%2Fauth%2Fcallback%2Fcognito&client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`)

                            }}>Login using another account</Button>

                            <Button variant={'link'} onClick={() => {
                                signOut({
                                    callbackUrl: '/',
                                    redirect: true
                                });
                            }}>Sign Out</Button>
                        </VStack>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover >
    )
}

export default function WithSubNavigation() {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box as={'nav'}>
            <Flex
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                justify={'space-between'}
                align={'center'}
            >
                <IconButton
                    display={{ md: 'none' }}
                    onClick={onToggle}
                    icon={
                        isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                    }
                    variant={'ghost'}
                    aria-label={'Toggle Navigation'}
                />

                {/* <Logo /> */}

                <DesktopNav />

                {UserAuthButton()}

            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box >
    );
}

const DesktopNav = () => {
    const [auth] = useSession();


    return (
        <Stack direction={'row'} spacing={4} alignItems={'center'} display={{ base: 'none', md: 'flex' }}>
            {NAV_ITEMS.map((navItem) => {
                const href = ((auth && navItem.authHref) ? navItem.authHref : navItem.href) ?? '/';
                return <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Box>
                                <Link
                                    p={2}
                                    href={href}
                                >
                                    {navItem.label}
                                </Link>
                            </Box>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                p={4}
                                minW={'sm'}
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            })}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel, authHref }: NavItem) => {
    const [auth] = useSession();

    return (
        <Link
            href={((auth && authHref) ? authHref : href) ?? '/'}
            role={'group'}
            p={2}
            rounded={'md'}
        >
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'gold' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'gold'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = () => {
    return (
        <Stack
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => {
                return <MobileNavItem key={navItem.label} {...navItem} />
            })}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href, authHref }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();
    const [auth] = useSession();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={((auth && authHref) ? authHref : href) ?? '/'}
                justify={'space-between'}
                align={'center'}>
                {label}
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <Stack
                    pl={4}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link key={child.label} href={((auth && authHref) ? child.authHref : child.href) ?? '/'}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
    authHref?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    // {
    //     label: 'Home',
    //     href: '/',
    //     children: [
    //         {
    //             label: 'Features',
    //             // subLabel: 'Trending Design to inspire you',
    //             href: '/#feature',
    //         },
    //         {
    //             label: 'How it works?',
    //             // subLabel: 'Up-and-coming Designers',
    //             href: '/#how-it-works',
    //         },
    //     ],
    // },
    // {
    //     label: 'How to pay GoldZIP',
    //     href: '/how-to-pay',
    // },
    {
        label: 'Supply',
        href: '/register?role=supplier',
        authHref: '/supply'
    },
    {
        label: 'Redeem',
        href: '/register',
        authHref: '/redeem'
    },
];
