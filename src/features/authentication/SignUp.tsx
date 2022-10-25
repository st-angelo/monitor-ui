import { useCallback, useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import {
  email,
  matches,
  minLenght,
  required,
  stopOnFirstFailure,
} from '../../utils/validation';
import {
  Box,
  PasswordInput,
  Button,
  TextInput,
  Text,
  Stack,
} from '@mantine/core';
import { SignUpData } from '../../models/authentication';
import { useAuthentication } from '../../features/authentication/AuthContext';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { MonitorErrorData } from '../../dto';
import { Link } from 'react-router-dom';
import { IconMail, IconLock, IconUser } from '@tabler/icons';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const validate = {
  firstName: stopOnFirstFailure([required, minLenght(2)]),
  lastName: stopOnFirstFailure([required, minLenght(2)]),
  email: stopOnFirstFailure([required, email]),
  password: stopOnFirstFailure([required, minLenght(8)]),
  passwordConfirm: stopOnFirstFailure([
    required,
    matches('password', 'Passwords do not match'),
  ]),
};

const SignUp = () => {
  const { signUp } = useAuthentication();
  const form = useForm<SignUpData & { passwordConfirm: string }>({
    initialValues,
    validate,
  });
  const [error, setError] = useState<string>();

  const signUpMutation = useMutation(signUp, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      setError(err.response?.data.message),
  });

  const handleSignUp = useCallback(async () => {
    setError('');
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    signUpMutation.mutate(form.values);
  }, [form]);

  return (
    <Stack sx={{ width: 320 }} mx='auto'>
      <TextInput
        label='First name'
        placeholder='Vasile'
        icon={<IconUser size='16' />}
        {...form.getInputProps('firstName')}
      />
      <TextInput
        label='Last name'
        placeholder='Dulgheru'
        icon={<IconUser size='16' />}
        {...form.getInputProps('lastName')}
      />
      <TextInput
        label='Email'
        placeholder='vasile.dulgheru@gmail.com'
        icon={<IconMail size='20' />}
        {...form.getInputProps('email')}
      />
      <PasswordInput
        label='Password'
        placeholder='Password'
        icon={<IconLock size='16' />}
        {...form.getInputProps('password')}
      />
      <PasswordInput
        label='Confirm password'
        placeholder='Confirm password'
        icon={<IconLock size='16' />}
        {...form.getInputProps('passwordConfirm')}
      />
      <Text color='red' size='sm'>
        {error}
      </Text>
      <Button onClick={handleSignUp}>Submit</Button>
      <Link to='/sign-in'>
        <Button className={'w-full'}>Go to sign in</Button>
      </Link>
    </Stack>
  );
};

export default SignUp;
