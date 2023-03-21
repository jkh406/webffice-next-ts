import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuthContext } from 'contexts/auth-context';

export const AuthGuard = (props : any) => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);
  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (ignore.current) {
        return;
      }

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
    },
    [router.isReady]
  );

  if (!checked) {
    return null;
  }

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node 
};