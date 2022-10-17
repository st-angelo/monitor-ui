import { useMemo } from 'react';
import ListBrowser from '../../components/common/list-browser/ListBrowser';
import transactionsListStore from './transactionsListStore';
import TransactionComponent from './TransactionComponent';
import { getTransactions } from '../../repository/transactionRepository';

const TransactionsComponent = () => {
  const queryData = useMemo(
    () => ({
      name: 'transactions',
      getter: getTransactions,
    }),
    [getTransactions]
  );

  return (
    <ListBrowser
      store={transactionsListStore}
      queryData={queryData}
      ItemComponent={TransactionComponent}
    />
  );
};

export default TransactionsComponent;
