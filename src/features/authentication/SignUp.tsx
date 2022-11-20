import { useCallback } from 'react';
import { useForm } from '@mantine/form';
import {
  email,
  matches,
  minLenght,
  required,
  stopOnFirstFailure,
} from '../../utils/validation';
import {
  PasswordInput,
  Button,
  TextInput,
  Stack,
  Center,
} from '@mantine/core';
import { SignUpData } from '../../models/authentication';
import { useAuthentication } from '../../features/authentication/AuthContext';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { MonitorErrorData } from '../../dto';
import { Link } from 'react-router-dom';
import { IconMail, IconLock, IconUser } from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../common/loader/useLoader';
import { showError } from '../common/notifications';

const initialValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const validate = {
  name: stopOnFirstFailure([required, minLenght(2)]),
  email: stopOnFirstFailure([required, email]),
  password: stopOnFirstFailure([required, minLenght(8)]),
  passwordConfirm: stopOnFirstFailure([
    required,
    matches('password', 'Passwords do not match'),
  ]),
};

const SignUp = () => {
  const { t } = useTranslation();
  const [openLoader, closeLoader] = useLoader();
  const { signUp } = useAuthentication();
  const form = useForm<SignUpData & { passwordConfirm: string }>({
    initialValues,
    validate,
  });

  const signUpMutation = useMutation(signUp, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      showError({ message: err.response?.data.message }),
    onSettled: closeLoader,
  });

  const handleSignUp = useCallback(async () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    openLoader();
    signUpMutation.mutate(form.values);
  }, [form, openLoader, signUpMutation]);

  return (
    <Center className='w-screen h-screen'>
      <Stack sx={{ width: 320 }} mx='auto'>
        <TextInput
          label={t('Label.Field.Name')}
          placeholder='Angelo de Medici'
          icon={<IconUser size='16' />}
          {...form.getInputProps('name')}
        />
        <TextInput
          label={t('Label.Field.Email')}
          placeholder='angelo.demedici@gmail.com'
          icon={<IconMail size='20' />}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label={t('Label.Field.Password')}
          placeholder={t('Label.Field.Password')}
          icon={<IconLock size='16' />}
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label={t('Label.Field.ConfirmPassword')}
          placeholder='Confirm password'
          icon={<IconLock size='16' />}
          {...form.getInputProps('passwordConfirm')}
        />
        <Button onClick={handleSignUp}>{t('Common.Submit')}</Button>
        <Link to='/sign-in'>
          <Button className={'w-full'}>{t('Label.Button.GoToSignIn')}</Button>
        </Link>
      </Stack>
    </Center>
  );
};

export default SignUp;
