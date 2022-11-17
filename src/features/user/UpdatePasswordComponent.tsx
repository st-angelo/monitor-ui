import { Button, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { MonitorErrorData } from '../../dto';
import { UpdatePasswordData } from '../../models/userProfile';
import { updatePassword } from '../../repository/userRepository';
import {
  maxLength,
  minLenght,
  required,
  stopOnFirstFailure,
} from '../../utils/validation';
import { useLoader } from '../common/loader/useLoader';
import { showError, showSuccess } from '../common/notifications';

const validate = {
  currentPassword: stopOnFirstFailure([required, minLenght(7), maxLength(50)]),
  newPassword: stopOnFirstFailure([required, minLenght(7), maxLength(50)]),
};

const UpdatePasswordComponent = () => {
  const [openLoader, closeLoader] = useLoader();

  const form = useForm<UpdatePasswordData>({ validate });

  const updatePasswordMutation = useMutation(updatePassword, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      showError({ message: err.response?.data.message }),
    onSettled: closeLoader,
    onSuccess: () => {
      showSuccess({
        message: 'Your password was updated!',
      });
    },
  });

  const handleUpdatePassword = useCallback(async () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    updatePasswordMutation.mutate(form.values);
    openLoader();
  }, [form, openLoader, updatePasswordMutation]);

  return (
    <div className='flex flex-col gap-5 max-w-[400px] my-5 mx-10'>
      <PasswordInput
        label={'Current password'}
        {...form.getInputProps('currentPassword')}
      />
      <PasswordInput
        label={'New password'}
        {...form.getInputProps('newPassword')}
      />
      <Button onClick={handleUpdatePassword}>Submit</Button>
    </div>
  );
};

export default UpdatePasswordComponent;
