import { Button, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import {
  completeNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
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
import AuthContainer from '../authentication/AuthContainer';
import { useAuthentication } from '../authentication/AuthContext';
import { showError, showSuccess } from '../common/notifications';

const UserNotVerified = () => {
  const { t } = useTranslation();
  const client = useQueryClient();
  const matches = useMediaQuery('(max-width: 576px)');
  const { user } = useAuthentication();
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
    <AuthContainer illustration='verifyEmail' withLogout gap='md'>
      <Text weight='bolder' className='text-xl md:text-3xl'>
        {t('Message.Verification.NotVerified')}
      </Text>
      <Text size={matches ? 'sm' : 'md'} italic>
        {t('Message.Verification.SentEmailAt', { email: user?.email })}
      </Text>
      <Button
        disabled={loading}
        size={matches ? 'xs' : 'sm'}
        onClick={handleResendVerificationEmail}
        className='self-start'
      >
        {t('Message.Verification.SendAnotherOne')}
      </Button>
      <Text size={matches ? 'xs' : 'sm'}>
        {t('Message.Verification.VerifyInfo')}
      </Text>
      <TextInput
        className='w-full'
        label={t('Label.Field.Email')}
        placeholder={'jane.doe@example.com'}
        size={matches ? 'xs' : 'sm'}
        disabled={loading}
        {...form.getInputProps('email')}
      />
      <Button
        onClick={handleUpdateAccountData}
        size={matches ? 'xs' : 'sm'}
        disabled={loading || !form.isDirty()}
        className={'self-start'}
      >
        {t('Common.Submit')}
      </Button>
    </AuthContainer>
  );
};

export default UserNotVerified;
