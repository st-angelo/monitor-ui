import { Button, Center, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  completeNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { IconMail } from '@tabler/icons';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { MonitorErrorData } from '../../dto';
import { ForgotPasswordData } from '../../models/authentication';
import { forgotPassword } from '../../repository/authenticationRepository';
import { email, required, stopOnFirstFailure } from '../../utils/validation';
import { showError, showSuccess } from '../common/notifications';

const initialValues = {
  email: '',
};

const validate = {
  email: stopOnFirstFailure([required, email]),
};

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const form = useForm<ForgotPasswordData>({
    initialValues,
    validate,
  });

  const forgotPaswordMutation = useMutation(forgotPassword, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      showError({ message: err.response?.data.message }),
    onSettled: () => {
      completeNavigationProgress();
      setLoading(false);
    },
    onSuccess: () => {
      showSuccess({ message: 'Check your email for resetting the password.' });
      form.reset();
    },
  });

  const handleForgotPassword = useCallback(async () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    forgotPaswordMutation.mutate(form.values);
    setLoading(true);
    startNavigationProgress();
  }, [form, forgotPaswordMutation]);

  return (
    <Center className='w-screen h-screen'>
      <Stack sx={{ width: 320 }} mx='auto'>
        <TextInput
          label={t('Label.Field.Email')}
          placeholder='angelo.demedici@gmail.com'
          withAsterisk
          icon={<IconMail size='20' />}
          disabled={loading}
          {...form.getInputProps('email')}
        />
        <Button onClick={handleForgotPassword} disabled={loading}>
          {t('Common.Submit')}
        </Button>
        <Link to='/sign-in'>
          <Button className={'w-full'}>{t('Label.Button.GoToSignIn')}</Button>
        </Link>
      </Stack>
    </Center>
  );
};

export default ForgotPassword;
