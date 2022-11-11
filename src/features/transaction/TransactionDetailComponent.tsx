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
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
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
import { useImplicitValues } from '../common/hooks/useImplicitValues';
import { useLoader } from '../common/loader/useLoader';
import { showSuccess } from '../common/notifications';

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

  const implicitValues = useImplicitValues();

  // #endregion

  useEffect(() => {
    if (!implicitValues) return;
    form.setValues(prev => ({
      ...prev,
      typeId: prev.typeId ?? implicitValues.transactionTypeId,
      currencyId: prev.currencyId ?? implicitValues.currencyId,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [implicitValues]);

  const mutateTransaction = useMutation(
    !transaction ? addTransaction : updateTransaction,
    {
      onError: (err: AxiosError<MonitorErrorData>) =>
        setError(err.response?.data.message),
      onSettled: closeLoader,
      onSuccess: () => {
        client.invalidateQueries(['transactions']);
        showSuccess({
          message: 'Your transaction was updated',
        });
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

  const categoriesByTransactionId = useMemo(
    () =>
      categories
        .filter(category => category.transactionTypeId === form.values.typeId)
        .map(({ value, label }) => ({ value, label })),
    [categories, form]
  );

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
            searchable
            data={categoriesByTransactionId}
          />
        </Grid.Col>
        <Grid.Col>
          <Select
            label='Currency'
            placeholder='Currency'
            clearable
            {...form.getInputProps('currencyId')}
            searchable
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
