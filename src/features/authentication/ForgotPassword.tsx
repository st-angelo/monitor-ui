import {
  Anchor,
  Button,
  Card,
  Container,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  completeNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { IconMail } from '@tabler/icons';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { MonitorErrorData } from '../../dto';
import { ForgotPasswordData } from '../../models/authentication';
import { forgotPassword } from '../../repository/authenticationRepository';
import { email, required, stopOnFirstFailure } from '../../utils/validation';
import ColorSchemeToggler from '../common/ColorSchemeToggler';
import LanguageSelector from '../common/LanguageSelector';
import { showError, showSuccess } from '../common/notifications';

const initialValues = {
  email: '',
};

const validate = {
  email: stopOnFirstFailure([required, email]),
};

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const form = useForm<ForgotPasswordData>({
    initialValues,
    validate,
  });

  const forgotPaswordMutation = useMutation(forgotPassword, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      showError({ message: err.response?.data.message }),
    onSettled: () => {
      completeNavigationProgress();
      setLoading(false);
    },
    onSuccess: () => {
      showSuccess({ message: 'Check your email for resetting the password.' });
      form.reset();
    },
  });

  const handleForgotPassword = useCallback(async () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    forgotPaswordMutation.mutate(form.values);
    setLoading(true);
    startNavigationProgress();
  }, [form, forgotPaswordMutation]);

  return (
    <div className='h-screen flex items-center justify-center'>
      <Container size={'lg'}>
        <Card className='bg-transparent'>
          <Card.Section>
            <div className='flex flex-col md:flex-row items-center md:gap-10'>
              <img
                src='/illustrations/forgotPassword.svg'
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
                    {t('Message.Authentication.ItHappens')}
                  </Text>
                  <Text>
                    {t('Message.Authentication.RememberedIt')}{' '}
                    <Anchor component={Link} to='/sign-in'>
                      {t('Message.Authentication.SignYouIn')}
                    </Anchor>
                  </Text>
                </div>
                <TextInput
                  label={t('Label.Field.Email')}
                  placeholder='cristi.pin@example.com'
                  withAsterisk
                  icon={<IconMail size='20' />}
                  disabled={loading}
                  {...form.getInputProps('email')}
                />
                <Button
                  onClick={handleForgotPassword}
                  disabled={loading}
                  mt='sm'
                >
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

export default ForgotPassword;
