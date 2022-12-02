import { ActionIcon, Card, Checkbox, Text } from '@mantine/core';
import {
  completeNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { IconEdit, IconTrash } from '@tabler/icons';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import useListBrowserUtils from '../../components/common/list-browser/useListBrowserUtils';
import { MonitorErrorData } from '../../dto';
import { Transaction } from '../../models/transaction';
import { deleteTransaction } from '../../repository/transactionRepository';
import { useConfirmDialog } from '../common/confirm-dialog/useConfirmDialog';
import { showError, showSuccess } from '../common/notifications';
import { useTransactionDetail } from './detail/useTransactionDetail';
import transactionsListStore from './transactionsListStore';
import { getTranslatedCategory } from './utils';

interface TransactionComponentProps {
  data: Transaction;
}

const TransactionComponent = ({ data }: TransactionComponentProps) => {
  const client = useQueryClient();
  const confirm = useConfirmDialog();
  const [openTransactionDetail] = useTransactionDetail();
  const { getIsSelected, handleSelect, removeSelections } = useListBrowserUtils(
    transactionsListStore
  );
  const [loading, setLoading] = useState(false);

  const deleteTransactionMutation = useMutation(deleteTransaction, {
    onError: (err: AxiosError<MonitorErrorData>) => {
      showError({
        message: err.response?.data.message,
      });
    },
    onSettled: () => {
      completeNavigationProgress();
      setLoading(false);
    },
    onSuccess: () => {
      client.invalidateQueries(['transactions']);
      client.invalidateQueries(['transaction-summary']);
      client.invalidateQueries(['latest-transaction-data']);
      removeSelections([data.id]);
      showSuccess({
        message: 'Your transaction was mutated',
      });
    },
  });

  const handleDeleteTransaction = useCallback(() => {
    deleteTransactionMutation.mutate(data.id);
    setLoading(true);
    startNavigationProgress();
  }, [data.id, deleteTransactionMutation]);

  return (
    <>
      <Card p={'md'} className={'w-full shadow-md'}>
        <div className='flex gap-3 items-center'>
          <Checkbox
            disabled={loading}
            checked={getIsSelected(data.id)}
            onChange={() => handleSelect(data.id)}
          />
          <div className='flex basis-full justify-between items-center'>
            <div>
              <Text weight={'bold'}>{`${getTranslatedCategory(
                data.category
              )}, ${data.amount.toLocaleString()} ${data.currency.code}`}</Text>
              <Text italic size='sm'>
                {data.description}
              </Text>
              <Text size={'sm'}>
                {new Date(data.date).toLocaleDateString()}
              </Text>
            </div>
            <div className='flex gap-2'>
              <ActionIcon
                variant='filled'
                disabled={loading}
                onClick={() => openTransactionDetail(data)}
              >
                <IconEdit size={20} />
              </ActionIcon>
              <ActionIcon
                variant='filled'
                color='orange'
                disabled={loading}
                onClick={() => confirm(handleDeleteTransaction)}
              >
                <IconTrash size={20} />
              </ActionIcon>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default TransactionComponent;
