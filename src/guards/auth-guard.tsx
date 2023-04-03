import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

export const useAuthGuard = () => {
  const router = useRouter();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);
  let isAuthenticated = useSelector((state : any) => state.auth.isAuthenticated);
  
  useEffect(() => {
    if (!router.isReady || ignore.current) {
      return;
    }
    ignore.current = true;

    console.log('cookies exist?', cookies.auth);
    if(cookies.auth)
    {
      isAuthenticated = true;
    } else {
      isAuthenticated = false;
    }
    console.log('isAuthenticated = ', isAuthenticated);

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