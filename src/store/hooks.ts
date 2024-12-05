import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import type {AppDispatch, StoreType} from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector;
