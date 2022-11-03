import {
  Button,
  Checkbox,
  Grid,
  NumberInput,
  SegmentedControl,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { MonitorErrorData } from '../../dto';
import {
  getMutateTransactionInitialData,
  MutateTransactionData,
  Transaction,
} from '../../models/transaction';
import {
  getCategories,
  getCurrencies,
  getTransactionTypes,
} from '../../repository/dictionaryRepository';
import {
  addTransaction,
  updateTransaction,
} from '../../repository/transactionRepository';
import { max, min, required, stopOnFirstFailure } from '../../utils/validation';
import { useDictionaryWithTranslation } from '../common/hooks/useDictionary';
import { useMiscellaneousInfo } from '../common/hooks/useMiscellaneousInfo';
import { useLoader } from '../common/loader/useLoader';

const validate = {
  typeId: required,
  amount: stopOnFirstFailure([required, min(1), max(1000000000)]),
  date: required,
  currencyId: required,
  categoryId: required,
};

interface TransactionDetailComponentProps {
  transaction?: Transaction;
}

const TransactionDetailComponent = ({
  transaction,
}: TransactionDetailComponentProps) => {
  const client = useQueryClient();
  const [openLoader, closeLoader] = useLoader();

  const form = useForm<MutateTransactionData>({
    initialValues: transaction
      ? new MutateTransactionData(transaction)
      : getMutateTransactionInitialData(),
    validate,
  });
  const [error, setError] = useState<string>();

  // #region Load dictionaries and auxiliary data

  const categories = useDictionaryWithTranslation(
    ['categories'],
    getCategories,
    { additionalFields: ['transactionTypeId'] }
  );

  const currencies = useDictionaryWithTranslation(
    ['currencies'],
    getCurrencies
  );

  const transactionTypes = useDictionaryWithTranslation(
    ['transactionTypes'],
    getTransactionTypes
  );

  useMiscellaneousInfo(data =>
    form.setValues(prev => ({
      ...prev,
      typeId: prev.typeId ?? data?.implicitTransactionTypeId,
      currencyId: prev.currencyId ?? data?.implicitCurrencyId,
    }))
  );

  // #endregion

  const mutateTransaction = useMutation(
    !transaction ? addTransaction : updateTransaction,
    {
      onError: (err: AxiosError<MonitorErrorData>) =>
        setError(err.response?.data.message),
      onSettled: closeLoader,
      onSuccess: () => {
        client.invalidateQueries(['miscellaneous-info']);
        client.invalidateQueries(['transactions']);
        toast.success('Your transaction was updated');
        localStorage.setItem('lastTransactionTypeId', form.values.typeId || '');
        localStorage.setItem('lastCurrencyId', form.values.currencyId || '');
      },
    }
  );

  const handleMutateTransaction = useCallback(() => {
    setError('');
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    mutateTransaction.mutate(form.values);
    openLoader();
  }, [form, openLoader, mutateTransaction]);

  return (
    <Stack>
      {transactionTypes.length > 0 && (
        <SegmentedControl
          {...form.getInputProps('typeId')}
          data={transactionTypes}
        />
      )}
      <Grid>
        <Grid.Col>
          <NumberInput
            label='Amount'
            placeholder='Amount'
            {...form.getInputProps('amount')}
          />
        </Grid.Col>
        <Grid.Col>
          <DatePicker
            label='Date'
            placeholder='Date from'
            {...form.getInputProps('date')}
          />
        </Grid.Col>
        <Grid.Col>
          <Select
            label='Category'
            placeholder='Category'
            clearable
            {...form.getInputProps('categoryId')}
            data={categories.filter(
              category => category.transactionTypeId === form.values.typeId
            )}
          />
        </Grid.Col>
        <Grid.Col>
          <Select
            label='Currency'
            placeholder='Currency'
            clearable
            {...form.getInputProps('currencyId')}
            data={currencies}
          />
        </Grid.Col>
        <Grid.Col>
          <Checkbox
            label='Is recurrent'
            {...form.getInputProps('isRecurrent')}
          />
        </Grid.Col>
      </Grid>

      <Text color='red' size='sm'>
        {error}
      </Text>
      <Button onClick={handleMutateTransaction}>Submit</Button>
    </Stack>
  );
};

export default TransactionDetailComponent;
