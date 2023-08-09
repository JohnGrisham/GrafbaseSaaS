import { LoadingContext } from '../providers';
import { useContext } from 'react';

export const useLoadingContext = () => useContext(LoadingContext);
