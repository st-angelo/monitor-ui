import { useCallback, useState } from 'react';
import { useForm } from '@mantine/form';
import {
  email,
  minLenght,
  required,
  stopOnFirstFailure,
} from '../../utils/validation';
import {
  Stack,
  PasswordInput,
  Button,
  TextInput,
  Text,
  Center,
} from '@mantine/core';
import { SignInData } from '../../models/authentication';
import { useAuthentication } from './AuthContext';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { MonitorErrorData } from '../../dto';
import { Link } from 'react-router-dom';
import { IconMail, IconLock } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

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
  const form = useForm<SignInData>({
    initialValues,
    validate,
  });
  const [error, setError] = useState<string>();

  const signInMutation = useMutation(signIn, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      setError(err.response?.data.message),
  });

  const handleSignIn = useCallback(async () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    signInMutation.mutate(form.values);
  }, [form, signInMutation]);

  return (
    <Center className='w-screen h-screen'>
      <Stack sx={{ width: 320 }} mx='auto'>
        <TextInput
          label={t('Label.Field.Email')}
          placeholder='john.doe@gmail.com'
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
        <Text color='red' size='sm'>
          {error}
        </Text>
        <Button onClick={handleSignIn}>{t('Common.Submit')}</Button>
        <Link to='/sign-up'>
          <Button className={'w-full'}>{t('Label.Button.GoToSignUp')}</Button>
        </Link>
      </Stack>
    </Center>
  );
};

export default SignIn;
