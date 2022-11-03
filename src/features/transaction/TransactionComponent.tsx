import { Card, Checkbox, Text } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { MonitorErrorData } from '../../dto';
import { Transaction } from '../../models/transaction';
import { deleteTransaction } from '../../repository/transactionRepository';
import { useConfirmDialog } from '../common/confirm-dialog/useConfirmDialog';
import { useLoader } from '../common/loader/useLoader';
import { getTranslatedCategory } from './utils';
import transactionsListStore from './transactionsListStore';
import useListBrowserUtils from '../../components/common/list-browser/useListBrowserUtils';

interface TransactionComponentProps {
  data: Transaction;
}

const TransactionComponent = ({ data }: TransactionComponentProps) => {
  const client = useQueryClient();
  const openConfirmDialog = useConfirmDialog();
  const [openLoader, closeLoader] = useLoader();
  const { getIsSelected, handleSelect } = useListBrowserUtils(transactionsListStore);

  const deleteTransactionMutation = useMutation(deleteTransaction, {
    onError: (err: AxiosError<MonitorErrorData>) => {
      toast.error(err.response?.data.message);
    },
    onSettled: closeLoader,
    onSuccess: () => {
      client.invalidateQueries(['transactions']);
      toast.success('Your transaction was deleted');
    },
  });

  const handleDeleteTransaction = useCallback(() => {
    deleteTransactionMutation.mutate(data.id);
    openLoader();
  }, [data.id, openLoader, deleteTransactionMutation]);

  return (
    <Card p={'md'} className={'w-full shadow-md'}>
      <div className='flex gap-3 items-center'>
        <Checkbox checked={getIsSelected(data.id)} onChange={() => handleSelect(data.id)} />
        <div className='flex basis-full justify-between items-center'>
          <div>
            <Text weight={'bold'}>{`${getTranslatedCategory(
              data.category
            )}, ${data.amount.toLocaleString()} ${data.currency.code}`}</Text>
            <Text size={'sm'}>{new Date(data.date).toLocaleString()}</Text>
          </div>
          <div className='flex gap-2'>
            <IconEdit className='cursor-pointer text-teal-600' size={20} />
            <IconTrash
              className='cursor-pointer text-rose-600'
              size={20}
              onClick={() => openConfirmDialog(handleDeleteTransaction)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TransactionComponent;
