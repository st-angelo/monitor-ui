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
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { MonitorErrorData } from '../../dto';
import { MutateTransactionData, Transaction } from '../../models/transaction';
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

const initialValues = {
  date: new Date(),
  isRecurrent: false,
};

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
  // #region Load dictionaries and auxiliary data

  const categories = useDictionaryWithTranslation(
    ['categories'],
    getCategories
  );
  const currencies = useDictionaryWithTranslation(
    ['currencies'],
    getCurrencies
  );
  const transactionTypes = useDictionaryWithTranslation(
    ['transactionTypes'],
    getTransactionTypes
  );
  const miscellaneousInfo = useMiscellaneousInfo();

  // #endregion

  const form = useForm<MutateTransactionData>({
    initialValues: transaction
      ? new MutateTransactionData(transaction)
      : initialValues,
    validate,
  });
  const [error, setError] = useState<string>();

  useEffect(() => {
    form.setValues(prev => ({
      ...prev,
      typeId:
        miscellaneousInfo?.lastTransactionTypeId ||
        miscellaneousInfo?.implicitTransactionTypeId,
      currencyId:
        miscellaneousInfo?.lastCurrencyId ||
        miscellaneousInfo?.implicitCurrencyId,
    }));
  }, [miscellaneousInfo]);

  const mutateTransaction = useMutation(
    !transaction ? addTransaction : updateTransaction,
    {
      onError: (err: AxiosError<MonitorErrorData>) =>
        setError(err.response?.data.message),
      onSuccess: () => {
        client.invalidateQueries(['miscellaneous-info']);
        toast.success('Your transaction was updated');
      },
    }
  );

  const handleMutateTransaction = useCallback(async () => {
    setError('');
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    mutateTransaction.mutate(form.values);
  }, [form]);

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
            data={categories}
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
