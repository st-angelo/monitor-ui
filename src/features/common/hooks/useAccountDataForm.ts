import { useForm } from '@mantine/form';
import {
  completeNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { AxiosError } from 'axios';
import { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { MonitorErrorData } from '../../../dto';
import {
  accountDataValidate,
  UpdateAccountData,
} from '../../../models/userProfile';
import { updateAccountData } from '../../../repository/userRepository';
import { useAuthentication } from '../../authentication/AuthContext';
import { showError, showSuccess } from '../notifications';

const useAccountDataForm = (
  successMessage: string,
  onMutate = () => {},
  onSettle = () => {},
  resetFields: string[] = []
) => {
  const { user } = useAuthentication();
  const client = useQueryClient();
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
      onSettle();
    },
    onSuccess: _ => {
      resetFields.forEach(field => form.setFieldValue(field, null));
      client.invalidateQueries(['user']);
      form.resetDirty();
      showSuccess({
        message: successMessage,
      });
    },
  });

  const handleUpdateAccountData = useCallback(async () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    updateAccountDataMutation.mutate(form.values);
    onMutate();
    startNavigationProgress();
  }, [form, updateAccountDataMutation, onMutate]);

  return { form, handleUpdateAccountData };
};

export default useAccountDataForm;
