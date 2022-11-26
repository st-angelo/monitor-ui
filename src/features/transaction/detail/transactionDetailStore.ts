import { writable } from 'react-use-svelte-store';
import { Transaction } from '../../../models/transaction';

interface TransactionDetailStore {
  open: boolean;
  transaction?: Partial<Transaction>;
}

const store = writable<TransactionDetailStore>({
  open: false,
});

export default store;
