import { useEffect, useState } from 'react';

export const useUserRole = () => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (typeof window !== 'undefined' && storageUser) {
        setValue(storageUser.user_role);
    }
  }, [value]);

  return value;
};