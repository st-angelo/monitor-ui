import { useCallback } from 'react';
import { useWritable } from 'react-use-svelte-store';
import confirmDialogStore from './confirmDialogStore';

export const useConfirmDialog = () => {
  const [, , $update] = useWritable(confirmDialogStore);

  const confirm = useCallback(
    (callback: () => void) =>
      $update(prev => ({ ...prev, open: true, callback })),
    [$update]
  );

  return confirm;
};
