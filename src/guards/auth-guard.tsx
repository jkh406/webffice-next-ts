import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useCookie } from 'utils/cookie';
import { useAppSelector } from 'hooks/use-auth';

export const useAuthGuard = () => {
  const router = useRouter();
  const [checked, setChecked] = useState(true);
  const { auth } = useCookie();
  const user = useAppSelector(state => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  useEffect(() => {
    if (!router.isReady ) {
      return;
    }

    if (auth) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    if (!isAuthenticated && !user.user) {
      console.log('Not authenticated, redirecting', isAuthenticated);
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [router.isReady, isAuthenticated, auth]);

  return checked;
};