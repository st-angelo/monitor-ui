import { writable } from 'react-use-svelte-store';
import { ListBrowserStore } from '../../components/common/list-browser/metadata';

interface TransactionFilters {
  dateFrom: Date | null;
  dateTo: Date | null;
  typeId: string | null;
  categoryId: string | null;
  currencyId: string | null;
  amountFrom: number | null;
  amountTo: number | null;
}

export const defaultTransactionFilters: TransactionFilters = {
  dateFrom: null,
  dateTo: null,
  typeId: null,
  categoryId: null,
  currencyId: null,
  amountFrom: null,
  amountTo: null,
};

class TransactionListStore extends ListBrowserStore {
  constructor() {
    super();
    this.pager.orderByFields = [
      { value: 'date', label: 'Date' },
      { value: 'amount', label: 'Amount' },
      { value: 'currency', label: 'Currency' },
    ];
    this.pager.orderBy = 'date';
    this.pager.size = 5;
    this.filters = {
      ...defaultTransactionFilters,
    };
  }
}

const store = writable(new TransactionListStore());

export default store;
