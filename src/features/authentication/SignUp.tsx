import { Anchor, Button, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  completeNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { IconLock, IconMail, IconUser } from '@tabler/icons';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { MonitorErrorData } from '../../dto';
import { useAuthentication } from '../../features/authentication/AuthContext';
import { SignUpData } from '../../models/authentication';
import {
  email,
  matches,
  minLenght,
  required,
  stopOnFirstFailure,
} from '../../utils/validation';
import { showError } from '../common/notifications';
import AuthContainer from './AuthContainer';

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
  const { signUp } = useAuthentication();
  const [loading, setLoading] = useState(false);
  const form = useForm<SignUpData & { passwordConfirm: string }>({
    initialValues,
    validate,
  });

  const signUpMutation = useMutation(signUp, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      showError({ message: err.response?.data.message }),
    onSettled: () => {
      completeNavigationProgress();
      setLoading(false);
    },
    onSuccess: () => form.reset(),
  });

  const handleSignUp = useCallback(async () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    signUpMutation.mutate(form.values);
    setLoading(true);
    startNavigationProgress();
  }, [form, signUpMutation]);

  return (
    <AuthContainer illustration='signUp'>
      <div className='flex flex-col items-center'>
        <Text size={30} weight='bold'>
          {t('Message.Authentication.GetStarted')}
        </Text>
        <Text>
          {t('Message.Authentication.HaveAccount')}{' '}
          <Anchor component={Link} to='/sign-in'>
            {t('Message.Authentication.SignYouIn')}
          </Anchor>
        </Text>
      </div>
      <TextInput
        label={t('Label.Field.Name')}
        placeholder='Rodica Cimpoi'
        icon={<IconUser size='20' />}
        disabled={loading}
        {...form.getInputProps('name')}
      />
      <TextInput
        label={t('Label.Field.Email')}
        placeholder='rodica.cimpoi@example.com'
        icon={<IconMail size='20' />}
        disabled={loading}
        {...form.getInputProps('email')}
      />
      <PasswordInput
        label={t('Label.Field.Password')}
        placeholder={t('Label.Field.Password')}
        icon={<IconLock size='20' />}
        disabled={loading}
        {...form.getInputProps('password')}
      />
      <PasswordInput
        label={t('Label.Field.ConfirmPassword')}
        placeholder={t('Label.Field.ConfirmPassword')}
        icon={<IconLock size='20' />}
        disabled={loading}
        {...form.getInputProps('passwordConfirm')}
      />
      <Button onClick={handleSignUp} disabled={loading} mt='sm'>
        {t('Common.Submit')}
      </Button>
    </AuthContainer>
  );
};

export default SignUp;
