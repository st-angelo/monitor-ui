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
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    signUpMutation.mutate(form.values);
  }, [form]);

  return (
    <Stack sx={{ width: 320 }} mx='auto'>
      <TextInput
        label='First name'
        placeholder='Vasile'
        {...form.getInputProps('firstName')}
      />
      <TextInput
        label='Last name'
        placeholder='Dulgheru'
        {...form.getInputProps('lastName')}
      />
      <TextInput
        label='Email'
        placeholder='vasile.dulgheru@gmail.com'
        {...form.getInputProps('email')}
      />
      <PasswordInput
        label='Password'
        placeholder='Password'
        {...form.getInputProps('password')}
      />
      <PasswordInput
        label='Confirm password'
        placeholder='Confirm password'
        {...form.getInputProps('passwordConfirm')}
      />
      <Text color='red' size='sm'>
        {error}
      </Text>
      <Button onClick={handleSignUp}>Submit</Button>
      <Link to='/signin'>
        <Button className={'w-full'}>Go to sign in</Button>
      </Link>
    </Stack>
  );
};

export default SignUp;
