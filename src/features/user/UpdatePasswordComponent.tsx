import { Button, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  completeNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
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
import { showError, showSuccess } from '../common/notifications';

const validate = {
  currentPassword: stopOnFirstFailure([required, minLenght(7), maxLength(50)]),
  newPassword: stopOnFirstFailure([required, minLenght(7), maxLength(50)]),
};

const UpdatePasswordComponent = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<UpdatePasswordData>({
    initialValues: { currentPassword: '', newPassword: '' },
    validate,
  });

  const updatePasswordMutation = useMutation(updatePassword, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      showError({ message: err.response?.data.message }),
    onSettled: () => {
      completeNavigationProgress();
      setLoading(false);
    },
    onSuccess: () => {
      form.reset();
      showSuccess({
        message: 'Your password was updated!',
      });
    },
  });

  const handleUpdatePassword = useCallback(async () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    updatePasswordMutation.mutate(form.values);
    setLoading(true);
    startNavigationProgress();
  }, [form, updatePasswordMutation]);

  return (
    <div className='flex flex-col gap-5 max-w-[400px] my-5 mx-10'>
      <PasswordInput
        label={'Current password'}
        disabled={loading}
        {...form.getInputProps('currentPassword')}
      />
      <PasswordInput
        label={'New password'}
        disabled={loading}
        {...form.getInputProps('newPassword')}
      />
      <Button onClick={handleUpdatePassword} disabled={loading}>
        Submit
      </Button>
    </div>
  );
};

export default UpdatePasswordComponent;
