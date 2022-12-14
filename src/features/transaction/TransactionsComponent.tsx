import {
  completeNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { IconTrash } from '@tabler/icons';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useReadable } from 'react-use-svelte-store';
import ListAction from '../../components/common/list-browser/ListAction';
import ListBrowser from '../../components/common/list-browser/ListBrowser';
import useListBrowserUtils from '../../components/common/list-browser/useListBrowserUtils';
import { MonitorErrorData } from '../../dto';
import {
  deleteTransactions,
  getTransactions,
} from '../../repository/transactionRepository';
import { useConfirmDialog } from '../common/confirm-dialog/useConfirmDialog';
import { showError, showSuccess } from '../common/notifications';
import TransactionComponent from './TransactionComponent';
import TransactionFiltersComponent from './TransactionFiltersComponent';
import transactionsListStore from './transactionsListStore';

const DeleteTransactionsAction = () => {
  const client = useQueryClient();
  const confirm = useConfirmDialog();
  const $store = useReadable(transactionsListStore);
  const { deselectAll } = useListBrowserUtils(transactionsListStore);
  const [loading, setLoading] = useState(false);

  const deleteTransactionsMutation = useMutation(deleteTransactions, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      showError({ message: err.response?.data.message }),
    onSettled: () => {
      completeNavigationProgress();
      setLoading(false);
    },
    onSuccess: () => {
      client.invalidateQueries(['transactions']);
      client.invalidateQueries(['transaction-summary']);
      client.invalidateQueries(['latest-transaction-data']);
      deselectAll();
      showSuccess({
        message: 'Your transactions were deleted',
      });
    },
  });

  const handleDeleteTransactions = useCallback(() => {
    deleteTransactionsMutation.mutate($store.selection);
    setLoading(true);
    startNavigationProgress();
  }, [$store, deleteTransactionsMutation]);

  return (
    <ListAction
      icon={<IconTrash size={14} />}
      tooltip={'Delete all selection'}
      handler={() => confirm(handleDeleteTransactions)}
      disabled={$store.selection.length === 0 || loading}
    />
  );
};

const TransactionsComponent = () => {
  const { addOrUpdateActions } = useListBrowserUtils(transactionsListStore);

  const queryData = useMemo(
    () => ({
      name: 'transactions',
      getter: getTransactions,
    }),
    []
  );

  const actions = useMemo(
    () => [
      {
        name: 'DeleteTransactions',
        visible: true,
        component: <DeleteTransactionsAction />,
      },
    ],
    []
  );

  useEffect(() => {
    addOrUpdateActions(actions);
  }, [addOrUpdateActions, actions]);

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
