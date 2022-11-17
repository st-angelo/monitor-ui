import { useMemo } from 'react';
import ListBrowser from '../../components/common/list-browser/ListBrowser';
import { getTransactions } from '../../repository/transactionRepository';
import TransactionComponent from './TransactionComponent';
import TransactionFiltersComponent from './TransactionFiltersComponent';
import transactionsListStore from './transactionsListStore';

const TransactionsComponent = () => {
  const queryData = useMemo(
    () => ({
      name: 'transactions',
      getter: getTransactions,
    }),
    []
  );

  return (
    <ListBrowser
      store={transactionsListStore}
      queryData={queryData}
      HeaderComponent={TransactionFiltersComponent}
      ItemComponent={TransactionComponent}
      withSelection
    />
  );
};

export default TransactionsComponent;
