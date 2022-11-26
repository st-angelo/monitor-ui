import {
  Button,
  Checkbox,
  Grid,
  Group,
  NumberInput,
  SegmentedControl,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { MonitorErrorData } from '../../../dto';
import {
  getRecurrenceTypes,
  MutateTransactionData,
  Transaction,
} from '../../../models/transaction';
import {
  getCategories,
  getCurrencies,
  getTransactionTypes,
} from '../../../repository/dictionaryRepository';
import {
  addTransaction,
  updateTransaction,
} from '../../../repository/transactionRepository';
import {
  max,
  min,
  required,
  stopOnFirstFailure,
} from '../../../utils/validation';
import { useDictionaryWithTranslation } from '../../common/hooks/useDictionary';
import { useImplicitValues } from '../../common/hooks/useImplicitValues';
import { useLoader } from '../../common/loader/useLoader';
import { showError, showSuccess } from '../../common/notifications';

const validate = {
  typeId: required,
  amount: stopOnFirstFailure([required, min(1), max(1000000000)]),
  date: required,
  currencyId: required,
  categoryId: required,
};

interface TransactionDetailComponentProps {
  transaction?: Partial<Transaction>;
  onEdit?: () => void;
}

const TransactionDetailComponent = ({
  transaction,
  onEdit,
}: TransactionDetailComponentProps) => {
  const { t } = useTranslation();
  const client = useQueryClient();
  const [openLoader, closeLoader] = useLoader();

  const form = useForm<MutateTransactionData>({
    initialValues: {
      id: transaction?.id,
      typeId:
        transaction?.typeId ?? localStorage.getItem('lastTransactionTypeId'),
      date:
        transaction && transaction.date
          ? new Date(transaction.date)
          : new Date(),
      currencyId:
        transaction?.currencyId ?? localStorage.getItem('lastCurrencyId'),
      amount: transaction?.amount ?? undefined,
      categoryId: transaction?.categoryId,
      recurrence: transaction?.recurrence,
    },
    validate,
  });

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
    !transaction?.id ? addTransaction : updateTransaction,
    {
      onError: (err: AxiosError<MonitorErrorData>) =>
        showError({ message: err.response?.data.message }),
      onSettled: closeLoader,
      onSuccess: () => {
        onEdit && onEdit();
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

  const isNew = useMemo(() => !transaction?.id, [transaction]);

  console.log(form.values.date);

  return (
    <Stack sx={{ maxWidth: 500 }}>
      {transactionTypes.length > 0 && (
        <SegmentedControl
          {...form.getInputProps('typeId')}
          disabled={!isNew}
          data={transactionTypes}
        />
      )}
      <Grid>
        <Grid.Col>
          <NumberInput
            label='Amount'
            placeholder='Amount'
            precision={2}
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
          <Text size='sm' mb={10}>
            Recurrent?
          </Text>
          <Group spacing={'sm'}>
            {getRecurrenceTypes().map(recurrence => (
              <Checkbox
                key={recurrence}
                label={t(`Recurrence.${recurrence}`)}
                checked={form.values.recurrence === recurrence}
                size='sm'
                onClick={() =>
                  form.setFieldValue(
                    'recurrence',
                    form.values.recurrence === recurrence ? null : recurrence
                  )
                }
              />
            ))}
          </Group>
          {form.values.recurrence && form.values.date && (
            <Text size='xs'>
              {t('Info.RecurrenceType', {
                recurrence: t(
                  `Recurrence.${form.values.recurrence}`
                ).toLowerCase(),
                date: format(form.values.date, 'yyyy-MM-dd'),
              })}
            </Text>
          )}
        </Grid.Col>
      </Grid>
      <Button onClick={handleMutateTransaction}>Submit</Button>
    </Stack>
  );
};

export default TransactionDetailComponent;
