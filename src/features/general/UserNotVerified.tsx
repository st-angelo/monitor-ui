import {
  ActionIcon,
  Button,
  Card,
  Container,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import {
  completeNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { IconLogout } from '@tabler/icons';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { MonitorErrorData } from '../../dto';
import {
  accountDataValidate,
  UpdateAccountData,
} from '../../models/userProfile';
import {
  resendVerificationEmail,
  updateAccountData,
} from '../../repository/userRepository';
import { useAuthentication } from '../authentication/AuthContext';
import ColorSchemeToggler from '../common/ColorSchemeToggler';
import LanguageSelector from '../common/LanguageSelector';
import { showError, showSuccess } from '../common/notifications';

const UserNotVerified = () => {
  const { t } = useTranslation();
  const client = useQueryClient();
  const matches = useMediaQuery('(max-width: 576px)');
  const { user, signOut } = useAuthentication();
  const [loading, setLoading] = useState(false);

  const form = useForm<UpdateAccountData>({ validate: accountDataValidate });

  useEffect(() => {
    if (form.isDirty()) return;
    form.setValues({
      email: user?.email,
      name: user?.name,
      nickname: user?.nickname,
      baseCurrencyId: user?.preferences?.baseCurrencyId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const updateAccountDataMutation = useMutation(updateAccountData, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      showError({ message: err.response?.data.message }),
    onSettled: () => {
      completeNavigationProgress();
      setLoading(false);
    },
    onSuccess: _ => {
      client.invalidateQueries(['user']);
      form.resetDirty();
      showSuccess({
        message: 'Your email was updated!',
      });
    },
  });

  const handleUpdateAccountData = useCallback(async () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    updateAccountDataMutation.mutate(form.values);
    setLoading(true);
    startNavigationProgress();
  }, [form, updateAccountDataMutation]);

  const resendVerificationEmailMutation = useMutation(resendVerificationEmail, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      showError({ message: err.response?.data.message }),
    onSettled: () => {
      completeNavigationProgress();
      setLoading(false);
    },
    onSuccess: _ => {
      showSuccess({
        message: "We've sent you another email!",
      });
    },
  });

  const handleResendVerificationEmail = useCallback(async () => {
    resendVerificationEmailMutation.mutate();
    setLoading(true);
    startNavigationProgress();
  }, [resendVerificationEmailMutation]);

  return (
    <div className='h-screen flex items-center justify-center'>
      <Container size={'lg'}>
        <Card className='bg-transparent'>
          <Card.Section p={'xl'}>
            <div className='flex'>
              <img
                src='/illustrations/verifyEmail.svg'
                alt='verify email'
                className='w-[300px] lg:w-[480px] hidden md:block'
              />
              <div className='flex flex-col gap-5 items-start p-3 md:pr-5 md:pl-0'>
                <div className='w-full flex gap-4 justify-end'>
                  <LanguageSelector />
                  <ColorSchemeToggler />
                  <Tooltip label={t('Navigation.LogOut')}>
                    <ActionIcon variant='outline' size='lg' onClick={signOut}>
                      <IconLogout />
                    </ActionIcon>
                  </Tooltip>
                </div>
                <Text weight='bolder' className='text-xl md:text-3xl'>
                  You are not verified!
                </Text>
                <Text size={matches ? 'sm' : 'md'} italic>
                  We've sent you a verification email at {user?.email}.
                </Text>
                <Button
                  disabled={loading}
                  onClick={handleResendVerificationEmail}
                >
                  Send another one
                </Button>
                <Text size={matches ? 'xs' : 'sm'}>
                  In order to access our services, we need to verify your email
                  address first. If you did not receive an email, check if it's
                  correct. You can change it below, or, alternatively, send
                  another one.
                </Text>
                <TextInput
                  className='w-full'
                  label={t('Label.Field.Email')}
                  placeholder={'john.doe@example.com'}
                  size={matches ? 'xs' : 'sm'}
                  disabled={loading}
                  {...form.getInputProps('email')}
                />
                <Button
                  onClick={handleUpdateAccountData}
                  size={matches ? 'xs' : 'sm'}
                  disabled={loading || !form.isDirty()}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Card.Section>
        </Card>
      </Container>
    </div>
  );
};

export default UserNotVerified;
