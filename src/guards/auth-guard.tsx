import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useCookie } from 'utils/cookie';
import { useAppSelector } from 'hooks/use-auth';

export const useAuthGuard = () => {
  const router = useRouter();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);
  const { auth } = useCookie();
  const user = useAppSelector(state => state.auth);
  let isAuthenticated = useSelector((state : any) => state.auth.isAuthenticated);
  
  useEffect(() => {
    if (!router.isReady || ignore.current) {
      return;
    }
    ignore.current = true;

    console.log('cookies exist?', auth);
    if(auth)
    {
      isAuthenticated = true;
    } else {
      isAuthenticated = false;
    }
    console.log('isAuthenticated = ', isAuthenticated);

    if (!isAuthenticated && !user) {
      console.log('Not authenticated, redirecting', isAuthenticated);
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [router.isReady, isAuthenticated, auth]);

  return checked;
};