import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from "store/configureStore";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useMockedUser = () => {
    const user = useSelector((state : any) => state.auth);
    console.log('useMockedUser', user);
    // authContext에서 사용자를 얻으려면 다음을 사용할 수 있습니다.
    // `const { user } = useAuth();`
    return {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io',
      token: ''
    };
  };
  