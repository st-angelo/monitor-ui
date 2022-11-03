import { useCallback } from 'react';
import { useWritable } from 'react-use-svelte-store';
import loaderStore from './loaderStore';

export const useLoader = () => {
  const [, , $update] = useWritable(loaderStore);

  const openLoader = useCallback(
    () => $update(prev => ({ ...prev, open: true })),
    [$update]
  );

  const closeLoader = useCallback(
    () => $update(prev => ({ ...prev, open: false })),
    [$update]
  );

  return [openLoader, closeLoader];
};
