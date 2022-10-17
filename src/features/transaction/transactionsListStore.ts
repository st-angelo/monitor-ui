import { writable } from 'react-use-svelte-store';
import { ListBrowserStore } from '../../components/common/list-browser/metadata';

interface TransactionFilters {
  name: string;
  description: string;
  color: string;
}

class TransactionListStore extends ListBrowserStore {
  transactionFilters: TransactionFilters;
  constructor() {
    super();
    this.pager.orderByFields = [
      { value: 'date', label: 'Date' },
      { value: 'amount', label: 'Amount' },
      { value: 'currency', label: 'Currency' },
    ];
    this.pager.orderBy = 'date';
    this.transactionFilters = {
      name: '',
      description: '',
      color: '',
    };
  }
}

const store = writable(new TransactionListStore());

export default store;
