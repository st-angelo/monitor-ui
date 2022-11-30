import {
  Anchor,
  Button,
  Card,
  Container,
  PasswordInput,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  completeNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { IconLock } from '@tabler/icons';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { MonitorErrorData } from '../../dto';
import { ResetPasswordData } from '../../models/authentication';
import {
  matches,
  minLenght,
  required,
  stopOnFirstFailure,
} from '../../utils/validation';
import ColorSchemeToggler from '../common/ColorSchemeToggler';
import LanguageSelector from '../common/LanguageSelector';
import { showError } from '../common/notifications';
import { useAuthentication } from './AuthContext';

const initialValues = {
  password: '',
  passwordConfirm: '',
};

const validate = {
  password: stopOnFirstFailure([required, minLenght(7)]),
  passwordConfirm: stopOnFirstFailure([
    required,
    matches('password', 'Passwords do not match'),
  ]),
};

const ResetPassword = () => {
  const { t } = useTranslation();
  const { resetPassword } = useAuthentication();
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const form = useForm<ResetPasswordData>({
    initialValues,
    validate,
  });

  const resetPasswordMutation = useMutation(resetPassword, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      showError({ message: err.response?.data.message }),
    onSettled: () => {
      completeNavigationProgress();
      setLoading(false);
    },
    onSuccess: () => form.reset(),
  });

  const handleResetPassword = useCallback(async () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    resetPasswordMutation.mutate({ ...form.values, token });
    setLoading(true);
    startNavigationProgress();
  }, [form, token, resetPasswordMutation]);

  return (
    <div className='h-screen flex items-center justify-center'>
      <Container size={'lg'}>
        <Card className='bg-transparent'>
          <Card.Section>
            <div className='flex flex-col md:flex-row items-center md:gap-10'>
              <img
                src='/illustrations/resetPassword.svg'
                alt='sign in'
                className='w-[300px]'
              />
              <div className='flex flex-col gap-4 p-3 md:pl-0 min-w-[320px]'>
                <div className='w-full flex gap-4 justify-end'>
                  <LanguageSelector />
                  <ColorSchemeToggler />
                </div>
                <div className='flex flex-col items-center'>
                  <Text size={30} weight='bold'>
                    {t('Message.Authentication.SetANewOne')}
                  </Text>
                  <Text>
                    {t('Message.Authentication.OrGoTo')}{' '}
                    <Anchor component={Link} to='/sign-in'>
                      {t('Message.Authentication.SignIn').toLowerCase()}
                    </Anchor>
                  </Text>
                </div>
                <PasswordInput
                  label={t('Label.Field.NewPassword')}
                  placeholder={t('Label.Field.NewPassword')}
                  withAsterisk
                  icon={<IconLock size='16' />}
                  disabled={loading}
                  {...form.getInputProps('password')}
                />
                <PasswordInput
                  label={t('Label.Field.ConfirmPassword')}
                  placeholder={t('Label.Field.ConfirmPassword')}
                  withAsterisk
                  icon={<IconLock size='16' />}
                  disabled={loading}
                  {...form.getInputProps('passwordConfirm')}
                />
                <Button onClick={handleResetPassword} disabled={loading}>
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

export default ResetPassword;
