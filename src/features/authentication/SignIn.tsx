import {
  Anchor,
  Button,
  Center,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  completeNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { IconLock, IconMail } from '@tabler/icons';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { MonitorErrorData } from '../../dto';
import { SignInData } from '../../models/authentication';
import {
  email,
  minLenght,
  required,
  stopOnFirstFailure,
} from '../../utils/validation';
import { showError } from '../common/notifications';
import { useAuthentication } from './AuthContext';

const initialValues = {
  email: '',
  password: '',
};

const validate = {
  email: stopOnFirstFailure([required, email]),
  password: stopOnFirstFailure([required, minLenght(7)]),
};

const SignIn = () => {
  const { t } = useTranslation();
  const { signIn } = useAuthentication();
  const [loading, setLoading] = useState(false);
  const form = useForm<SignInData>({
    initialValues,
    validate,
  });

  const signInMutation = useMutation(signIn, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      showError({ message: err.response?.data.message }),
    onSettled: () => {
      completeNavigationProgress();
      setLoading(false);
    },
    onSuccess: () => form.reset(),
  });

  const handleSignIn = useCallback(async () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    signInMutation.mutate(form.values);
    setLoading(true);
    startNavigationProgress();
  }, [form, signInMutation]);

  return (
    <Center className='w-screen h-screen'>
      <Stack sx={{ width: 320 }} mx='auto'>
        <TextInput
          label={t('Label.Field.Email')}
          placeholder='angelo.demedici@gmail.com'
          disabled={loading}
          withAsterisk
          icon={<IconMail size='20' />}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label={t('Label.Field.Password')}
          placeholder={t('Label.Field.Password')}
          disabled={loading}
          withAsterisk
          icon={<IconLock size='16' />}
          {...form.getInputProps('password')}
        />
        <Anchor
          component={Link}
          to='/forgot-password'
          className='text-sm text-right'
        >
          Forgot password?
        </Anchor>
        <Button onClick={handleSignIn} disabled={loading}>
          {t('Common.Submit')}
        </Button>
        <Link to='/sign-up'>
          <Button className={'w-full'}>{t('Label.Button.GoToSignUp')}</Button>
        </Link>
      </Stack>
    </Center>
  );
};

export default SignIn;
