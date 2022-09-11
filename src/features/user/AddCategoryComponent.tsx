import { useCallback, useState } from 'react';
import { Button, ColorInput, Stack, Text, TextInput } from '@mantine/core';
import {
  maxLength,
  required,
  stopOnFirstFailure,
} from '../../utils/validation';
import { AddCategoryData } from '../../models/userProfile';
import { useForm } from '@mantine/form';
import { useMutation } from 'react-query';
import axios from '../../utils/axios';
import { AxiosError } from 'axios';
import { MonitorErrorData } from '../../dto';
import { toast } from 'react-toastify';

const initialValues = {
  name: '',
  description: '',
  color: '',
};

const validate = {
  name: stopOnFirstFailure([required, maxLength(50)]),
  description: stopOnFirstFailure([maxLength(500)]),
  color: required,
};

const AddCategoryComponent = () => {
  const form = useForm<AddCategoryData>({
    initialValues,
    validate,
  });
  const [error, setError] = useState<string>();

  const addCategory = (input: AddCategoryData) => {
    return axios({
      method: 'POST',
      url: '/user/category',
      data: {
        ...input,
      },
    });
  };

  const signUpMutation = useMutation(addCategory, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      setError(err.response?.data.message),
    onSuccess: () => {
      toast.success('Your category was added');
    },
  });

  const handleAddCategory = useCallback(async () => {
    setError('');
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    signUpMutation.mutate(form.values);
  }, [form]);

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

export default AddCategoryComponent;
