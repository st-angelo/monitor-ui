import { Button, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { AxiosError } from 'axios';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { MonitorErrorData } from '../../dto';
import { UpdateAccountData } from '../../models/userProfile';
import { getCurrencies } from '../../repository/dictionaryRepository';
import { updateAccountData } from '../../repository/userRepository';
import {
  maxLength,
  required,
  stopOnFirstFailure,
} from '../../utils/validation';
import { useAuthentication } from '../authentication/AuthContext';
import AvatarDropzone from '../common/AvatarDropzone';
import { useDictionaryWithTranslation } from '../common/hooks/useDictionary';
import { useLoader } from '../common/loader/useLoader';
import { showError, showSuccess } from '../common/notifications';

const validate = {
  name: stopOnFirstFailure([required, maxLength(100)]),
  nickname: maxLength(20),
  baseCurrencyId: required,
};

const AccountDataComponent = () => {
  const { t } = useTranslation();
  const [openLoader, closeLoader] = useLoader();
  const { user, updateToken } = useAuthentication();

  const form = useForm<UpdateAccountData>({ validate });

  useEffect(() => {
    if (form.isDirty()) return;
    form.setValues({
      name: user?.name,
      nickname: user?.nickname,
      baseCurrencyId: user?.preferences?.baseCurrencyId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const currencies = useDictionaryWithTranslation(
    ['currencies'],
    getCurrencies
  );

  const updateAccountDataMutation = useMutation(updateAccountData, {
    onError: (err: AxiosError<MonitorErrorData>) =>
      showError({ message: err.response?.data.message }),
    onSettled: closeLoader,
    onSuccess: response => {
      updateToken(response.data.token);
      form.setFieldValue('avatar', null);
      form.resetDirty();
      showSuccess({
        message: 'Your password was updated!',
      });
    },
  });

  const handleUpdateAccountData = useCallback(async () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    updateAccountDataMutation.mutate(form.values);
    openLoader();
  }, [form, openLoader, updateAccountDataMutation]);

  return (
    <div className='flex my-5 mx-10 gap-10'>
      <div className='flex flex-col gap-5 w-[400px]'>
        <TextInput
          value={user?.email}
          disabled
          label={t('Label.Field.Email')}
        />
        <TextInput
          label={t('Label.Field.Name')}
          {...form.getInputProps('name')}
        />
        <TextInput
          label={t('Label.Field.Nickname')}
          {...form.getInputProps('nickname')}
        />
        <Select
          label='Currency'
          searchable
          data={currencies}
          {...form.getInputProps('baseCurrencyId')}
        />
        <Button disabled={!form.isDirty()} onClick={handleUpdateAccountData}>
          Save
        </Button>
      </div>
      <AvatarDropzone
        value={user?.avatarUrl}
        file={form.values.avatar}
        onChange={file => form.setFieldValue('avatar', file)}
      />
    </div>
  );
};

export default AccountDataComponent;
