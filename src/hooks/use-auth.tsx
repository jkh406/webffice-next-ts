import { useContext } from 'react';
import { AuthContext } from 'contexts/auth-context';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from "store/configureStore";

export const useAuth = () => useContext(AuthContext);
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;