import { Button, Center, PasswordInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock } from '@tabler/icons';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { MonitorErrorData } from '../../dto';
import { ResetPasswordData } from '../../models/authentication';
import {
  matches,
  minLenght,
  required,
  stopOnFirstFailure,
} from '../../utils/validation';
import { useLoader } from '../common/loader/useLoader';
import { showError } from '../common/notifications';
import { useAuthentication } from './AuthContext';

const initialValues = {
  password: '',
  passwordConfirm: '',
};

const validate = {
  password: stopOnFirstFailure([required, minLenght(7)]),
  passwordConfirm: stopOnFirstFailure([
    required,
    matches('password', 'Passwords do not match'),
  ]),
};

const ResetPassword = () => {
  const { t } = useTranslation();
  const [openLoader, closeLoader] = useLoader();
  const { resetPassword } = useAuthentication();
  const { token } = useParams();
  const form = useForm<ResetPasswordData>({
    initialValues,
    validate,
  });

  const resetPasswordMutation = useMutation(resetPassword, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      showError({ message: err.response?.data.message }),
    onSettled: closeLoader,
  });

  const handleResetPassword = useCallback(async () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    openLoader();
    resetPasswordMutation.mutate({ ...form.values, token });
  }, [form, openLoader, token, resetPasswordMutation]);

  return (
    <Center className='w-screen h-screen'>
      <Stack sx={{ width: 320 }} mx='auto'>
        <PasswordInput
          label={t('Label.Field.NewPassword')}
          placeholder={t('Label.Field.NewPassword')}
          withAsterisk
          icon={<IconLock size='16' />}
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label={t('Label.Field.ConfirmPassword')}
          placeholder={t('Label.Field.ConfirmPassword')}
          withAsterisk
          icon={<IconLock size='16' />}
          {...form.getInputProps('passwordConfirm')}
        />
        <Button onClick={handleResetPassword}>{t('Common.Submit')}</Button>
        <Link to='/sign-in'>
          <Button className={'w-full'}>{t('Label.Button.GoToSignIn')}</Button>
        </Link>
      </Stack>
    </Center>
  );
};

export default ResetPassword;