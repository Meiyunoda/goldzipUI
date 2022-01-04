// https://theodorusclarence.com/blog/nextjs-redirect-no-flashing

// import { useAuth } from '../lib/auth';
import { Center, Spinner, useToast } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';



export default function PrivateRoute({ protectedRoutes, children }) {
  const [auth, isAuthLoading] = useSession();
  const router = useRouter();
  const toast = useToast();

  const pathIsProtected = protectedRoutes.includes(router.pathname);

  useEffect(() => {
    if (!isAuthLoading && !auth && pathIsProtected) {
      router.push('/');

      toast({
        title: "Please Login.",
        status: "error",
        duration: 8000,
        isClosable: true,
      })
    }
  }, [isAuthLoading, auth, pathIsProtected]);

  if ((isAuthLoading || !auth) && pathIsProtected) {
    return <Center h={'50vh'}>
      <Spinner />
    </Center>;
  }

  return children;
}