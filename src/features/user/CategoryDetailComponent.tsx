import { useCallback, useState } from 'react';
import {
  Button,
  ColorInput,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import {
  maxLength,
  required,
  stopOnFirstFailure,
} from '../../utils/validation';
import { AddCategoryData } from '../../models/userProfile';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { MonitorErrorData } from '../../dto';
import { addCategory } from '../../repository/categoryRepository';
import { useDictionaryWithTranslation } from '../common/hooks/useDictionary';
import { getTransactionTypes } from '../../repository/dictionaryRepository';
import { useLoader } from '../common/loader/useLoader';
import { showSuccess } from '../common/notifications';

const validate = {
  name: stopOnFirstFailure([required, maxLength(50)]),
  description: stopOnFirstFailure([maxLength(500)]),
  transactionTypeId: required,
  color: required,
};

interface CategoryDetailComponentProps {
  id?: number;
}

const CategoryDetailComponent = ({ id }: CategoryDetailComponentProps) => {
  const client = useQueryClient();
  const [openLoader, closeLoader] = useLoader();

  const form = useForm<AddCategoryData>({
    validate,
  });
  const [error, setError] = useState<string>();

  const transactionTypes = useDictionaryWithTranslation(
    ['transactionTypes'],
    getTransactionTypes
  );

  const mutateCategory = useMutation(addCategory, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      setError(err.response?.data.message),
    onSettled: closeLoader,
    onSuccess: () => {
      client.invalidateQueries(['categories']);
      showSuccess({
        message: 'Your category was added',
      });
    },
  });

  const handleAddCategory = useCallback(async () => {
    setError('');
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    mutateCategory.mutate(form.values);
    openLoader();
  }, [form, openLoader, mutateCategory]);

  return (
    <Stack sx={{ width: 320 }} mx='auto'>
      <TextInput
        label='Name'
        placeholder='Name'
        withAsterisk
        {...form.getInputProps('name')}
      />
      <TextInput
        label='Description'
        placeholder='Description'
        {...form.getInputProps('description')}
      />
      <Select
        label='Transaction type'
        placeholder='Transaction type'
        clearable
        {...form.getInputProps('transactionTypeId')}
        data={transactionTypes}
      />
      <ColorInput
        label='Color'
        placeholder='Color'
        withAsterisk
        {...form.getInputProps('color')}
      />
      <Text color='red' size='sm'>
        {error}
      </Text>
      <Button onClick={handleAddCategory}>Submit</Button>
    </Stack>
  );
};

export default CategoryDetailComponent;
