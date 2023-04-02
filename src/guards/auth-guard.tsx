import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export const useAuthGuard = () => {
  const router = useRouter();
  const isAuthenticated = useSelector((state : any) => state.auth.isAuthenticated);
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);
  
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    
    if (ignore.current) {
      return;
    }

    // isAuthenticated: user ? true : false

    console.log('isAuthenticated = ', isAuthenticated);
    ignore.current = true;

    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting', isAuthenticated);
      router
        .replace({
          pathname: '/auth/login',
          query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
        })
        .catch(console.error);
    } else {
      setChecked(true);
    }
  }, [router.isReady, isAuthenticated]);

  return checked;
};