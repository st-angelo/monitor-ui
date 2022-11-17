import { Button, ColorInput, Select, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { AxiosError } from 'axios';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { MonitorErrorData } from '../../dto';
import { Category } from '../../models/common';
import { MutateCategoryData } from '../../models/userProfile';
import {
  addCategory,
  updateCategory,
} from '../../repository/categoryRepository';
import { getTransactionTypes } from '../../repository/dictionaryRepository';
import {
  maxLength,
  required,
  stopOnFirstFailure,
} from '../../utils/validation';
import { useDictionaryWithTranslation } from '../common/hooks/useDictionary';
import { useLoader } from '../common/loader/useLoader';
import { showError, showSuccess } from '../common/notifications';

const validate = {
  name: stopOnFirstFailure([required, maxLength(50)]),
  description: stopOnFirstFailure([maxLength(500)]),
  transactionTypeId: required,
  color: required,
};

interface CategoryDetailComponentProps {
  category?: Category;
  onEdit?: () => void;
}

const CategoryDetailComponent = ({
  category,
  onEdit,
}: CategoryDetailComponentProps) => {
  const { t } = useTranslation();
  const client = useQueryClient();
  const [openLoader, closeLoader] = useLoader();

  const form = useForm<MutateCategoryData>({
    initialValues: {
      id: category?.id,
      code: category?.code,
      name: category?.name ?? '',
      description: category?.description ?? '',
      transactionTypeId: category?.transactionTypeId ?? '',
      color: category?.color ?? '',
    },
    validate,
  });

  const transactionTypes = useDictionaryWithTranslation(
    ['transactionTypes'],
    getTransactionTypes
  );

  const mutateCategory = useMutation(!category ? addCategory : updateCategory, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      showError({ message: err.response?.data.message }),
    onSettled: closeLoader,
    onSuccess: () => {
      onEdit && onEdit();
      client.invalidateQueries(['user-categories']);
      client.invalidateQueries(['categories']);
      showSuccess({
        message: 'Your category was mutated',
      });
    },
  });

  const handleMutateCategory = useCallback(async () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    mutateCategory.mutate(form.values);
    openLoader();
  }, [form, openLoader, mutateCategory]);

  const isNew = useMemo(() => !category, [category]);

  return (
    <Stack sx={{ width: 400 }}>
      <TextInput
        label={t('Label.Field.Name')}
        placeholder={t('Label.Field.Name')}
        withAsterisk
        {...form.getInputProps('name')}
      />
      <TextInput
        label={t('Label.Field.Description')}
        placeholder={t('Label.Field.Description')}
        {...form.getInputProps('description')}
      />
      <Select
        label={t('Label.Field.TransactionType')}
        placeholder={t('Label.Field.TransactionType')}
        clearable
        disabled={!isNew}
        {...form.getInputProps('transactionTypeId')}
        data={transactionTypes}
      />
      <ColorInput
        label={t('Label.Field.Color')}
        placeholder={t('Label.Field.Color')}
        withAsterisk
        {...form.getInputProps('color')}
      />
      <Button onClick={handleMutateCategory}>Submit</Button>
    </Stack>
  );
};

export default CategoryDetailComponent;
