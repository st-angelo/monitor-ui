import { useCallback } from 'react';
import { useWritable } from 'react-use-svelte-store';
import { Transaction } from '../../../models/transaction';
import transactionDetailStore from './transactionDetailStore';

export const useTransactionDetail = () => {
  const [, , $update] = useWritable(transactionDetailStore);

  const open = useCallback(
    (transaction?: Partial<Transaction>) =>
      $update(prev => ({ ...prev, open: true, transaction })),
    [$update]
  );

  return open;
};
