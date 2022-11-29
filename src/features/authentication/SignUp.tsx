import {
  Anchor,
  Button,
  Card,
  Container,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
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
import ColorSchemeToggler from '../common/ColorSchemeToggler';
import LanguageSelector from '../common/LanguageSelector';
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
    <div className='h-screen flex items-center justify-center'>
      <Container size={'lg'}>
        <Card className='bg-transparent'>
          <Card.Section>
            <div className='grid lg:grid-cols-2 items-center'>
              <img
                src='/illustrations/signUp.svg'
                alt='sign in'
                className='w-[300px] lg:w-[480px]'
              />
              <div className='flex flex-col gap-4 p-3 md:pl-0 min-w-[350px]'>
                <div className='w-full flex gap-4 justify-end'>
                  <LanguageSelector />
                  <ColorSchemeToggler />
                </div>
                <div className='flex flex-col items-center'>
                  <Text size={30} weight='bold'>
                    Get started
                  </Text>
                  <Text>
                    Already have an account?{' '}
                    <Anchor component={Link} to='/sign-in'>
                      Sign in
                    </Anchor>
                  </Text>
                </div>
                <TextInput
                  label={t('Label.Field.Name')}
                  placeholder='Angelo de Medici'
                  icon={<IconUser size='20' />}
                  disabled={loading}
                  {...form.getInputProps('name')}
                />
                <TextInput
                  label={t('Label.Field.Email')}
                  placeholder='angelo.demedici@gmail.com'
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
                  placeholder='Confirm password'
                  icon={<IconLock size='20' />}
                  disabled={loading}
                  {...form.getInputProps('passwordConfirm')}
                />
                <Button onClick={handleSignUp} disabled={loading} mt='sm'>
                  {t('Common.Submit')}
                </Button>
              </div>
            </div>
          </Card.Section>
        </Card>
      </Container>
    </div>
  );
};

export default SignUp;
