import { useCallback, useState } from 'react';
import { useForm } from '@mantine/form';
import {
  email,
  minLenght,
  required,
  stopOnFirstFailure,
} from '../../utils/validation';
import { Stack, PasswordInput, Button, TextInput, Text } from '@mantine/core';
import { SignInData } from '../../models/authentication';
import { useAuthentication } from './AuthContext';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { MonitorErrorData } from '../../dto';
import { Link } from 'react-router-dom';
import { IconMail, IconLock } from '@tabler/icons';

const initialValues = {
  email: '',
  password: '',
};

const validate = {
  email: stopOnFirstFailure([required, email]),
  password: stopOnFirstFailure([required, minLenght(8)]),
};

const SignIn = () => {
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
  }, [form]);
  
  return (
    <Stack sx={{ width: 320 }} mx='auto'>
      <TextInput
        label='Email'
        placeholder='vasile.dulgheru@gmail.com'
        withAsterisk
        icon={<IconMail size='20' />}
        {...form.getInputProps('email')}
      />
      <PasswordInput
        label='Password'
        placeholder='Password'
        withAsterisk
        icon={<IconLock size='16' />}
        {...form.getInputProps('password')}
      />
      <Text color='red' size='sm'>
        {error}
      </Text>
      <Button onClick={handleSignIn}>Submit</Button>
      <Link to='/signup'>
        <Button className={'w-full'}>Go to sign up</Button>
      </Link>
    </Stack>
  );
};

export default SignIn;
