import { Button, Text, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  completeNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { MonitorErrorData } from '../../dto';
import { resendVerificationEmail } from '../../repository/userRepository';
import AuthContainer from '../authentication/AuthContainer';
import { useAuthentication } from '../authentication/AuthContext';
import useAccountDataForm from '../common/hooks/useAccountDataForm';
import { showError, showSuccess } from '../common/notifications';

const UserNotVerified = () => {
  const { t } = useTranslation();
  const matches = useMediaQuery('(max-width: 576px)');
  const { user } = useAuthentication();
  const [loading, setLoading] = useState(false);

  const { form, handleUpdateAccountData } = useAccountDataForm(
    t('Notification.EmailUpdated'),
    () => setLoading(true),
    () => setLoading(false)
  );

  const resendVerificationEmailMutation = useMutation(resendVerificationEmail, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      showError({ message: err.response?.data.message }),
    onSettled: () => {
      completeNavigationProgress();
      setLoading(false);
    },
    onSuccess: _ => {
      showSuccess({
        message: t('Notification.SentAnotherEmail'),
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
