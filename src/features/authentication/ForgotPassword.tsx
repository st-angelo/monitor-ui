import { Button, Center, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconMail } from '@tabler/icons';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { MonitorErrorData } from '../../dto';
import { ForgotPasswordData } from '../../models/authentication';
import { forgotPassword } from '../../repository/authenticationRepository';
import { email, required, stopOnFirstFailure } from '../../utils/validation';
import { useLoader } from '../common/loader/useLoader';
import { showError, showSuccess } from '../common/notifications';

const initialValues = {
  email: '',
};

const validate = {
  email: stopOnFirstFailure([required, email]),
};

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [openLoader, closeLoader] = useLoader();
  const form = useForm<ForgotPasswordData>({
    initialValues,
    validate,
  });

  const forgotPaswordMutation = useMutation(forgotPassword, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      showError({ message: err.response?.data.message }),
    onSettled: closeLoader,
    onSuccess: () =>
      showSuccess({ message: 'Check your email for resetting the password.' }),
  });

  const handleForgotPassword = useCallback(async () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    openLoader();
    forgotPaswordMutation.mutate(form.values);
  }, [form, openLoader, forgotPaswordMutation]);

  return (
    <Center className='w-screen h-screen'>
      <Stack sx={{ width: 320 }} mx='auto'>
        <TextInput
          label={t('Label.Field.Email')}
          placeholder='angelo.demedici@gmail.com'
          withAsterisk
          icon={<IconMail size='20' />}
          {...form.getInputProps('email')}
        />
        <Button onClick={handleForgotPassword}>{t('Common.Submit')}</Button>
        <Link to='/sign-in'>
          <Button className={'w-full'}>{t('Label.Button.GoToSignIn')}</Button>
        </Link>
      </Stack>
    </Center>
  );
};

export default ForgotPassword;
