import {
  Button,
  Center,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock, IconMail } from '@tabler/icons';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
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
import { useLoader } from '../common/loader/useLoader';
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
  const [openLoader, closeLoader] = useLoader();
  const { signIn } = useAuthentication();
  const form = useForm<SignInData>({
    initialValues,
    validate,
  });

  const signInMutation = useMutation(signIn, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      showError({ message: err.response?.data.message }),
    onSettled: closeLoader,
  });

  const handleSignIn = useCallback(async () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    openLoader();
    signInMutation.mutate(form.values);
  }, [form, openLoader, signInMutation]);

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
        <PasswordInput
          label={t('Label.Field.Password')}
          placeholder={t('Label.Field.Password')}
          withAsterisk
          icon={<IconLock size='16' />}
          {...form.getInputProps('password')}
        />
        <Button onClick={handleSignIn}>{t('Common.Submit')}</Button>
        <Link to='/sign-up'>
          <Button className={'w-full'}>{t('Label.Button.GoToSignUp')}</Button>
        </Link>
      </Stack>
    </Center>
  );
};

export default SignIn;
