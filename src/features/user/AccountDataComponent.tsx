import { Button, Select, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCurrencies } from '../../repository/dictionaryRepository';
import { useAuthentication } from '../authentication/AuthContext';
import AvatarDropzone from '../common/AvatarDropzone';
import useAccountDataForm from '../common/hooks/useAccountDataForm';
import { useDictionaryWithTranslation } from '../common/hooks/useDictionary';

const AccountDataComponent = () => {
  const { t } = useTranslation();
  const { user } = useAuthentication();
  const [loading, setLoading] = useState(false);

  const { form, handleUpdateAccountData } = useAccountDataForm(
    t('Notification.AccountDataUpdated'),
    () => setLoading(true),
    () => setLoading(false),
    ['avatar']
  );

  const currencies = useDictionaryWithTranslation(
    ['currencies'],
    getCurrencies
  );

  return (
    <div className='flex my-5 mx-10 gap-10'>
      <div className='flex flex-col gap-5 w-[400px]'>
        <TextInput
          label={t('Label.Field.Email')}
          description={
            form.isDirty('email') ? 'New emails must be verified' : ''
          }
          disabled={loading}
          {...form.getInputProps('email')}
        />
        <TextInput
          label={t('Label.Field.Name')}
          disabled={loading}
          withAsterisk
          {...form.getInputProps('name')}
        />
        <TextInput
          label={t('Label.Field.Nickname')}
          disabled={loading}
          {...form.getInputProps('nickname')}
        />
        <Select
          label='Currency'
          searchable
          disabled={loading}
          withAsterisk
          data={currencies}
          {...form.getInputProps('baseCurrencyId')}
        />
        <Button
          disabled={!form.isDirty() || loading}
          onClick={handleUpdateAccountData}
        >
          Save
        </Button>
      </div>
      <AvatarDropzone
        value={user?.avatarUrl}
        file={form.values.avatar}
        onChange={file => form.setFieldValue('avatar', file)}
        disabled={loading}
      />
    </div>
  );
};

export default AccountDataComponent;
