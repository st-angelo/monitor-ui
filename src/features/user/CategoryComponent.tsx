import { Card, Text } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { MonitorErrorData } from '../../dto';
import { Category } from '../../models/common';
import { deleteCategory } from '../../repository/categoryRepository';
import { useConfirmDialog } from '../common/confirm-dialog/useConfirmDialog';
import { useLoader } from '../common/loader/useLoader';

interface CategoryComponentProps {
  data: Category;
}

const CategoryComponent = ({ data }: CategoryComponentProps) => {
  const client = useQueryClient();
  const openConfirmDialog = useConfirmDialog();
  const [openLoader, closeLoader] = useLoader();

  const deleteCategoryMutation = useMutation(deleteCategory, {
    onError: (err: AxiosError<MonitorErrorData>) => {
      toast.error(err.response?.data.message);
    },
    onSettled: closeLoader,
    onSuccess: () => {
      client.invalidateQueries(['user-categories']);
      toast.success('Your category was deleted');
    },
  });

  const handleDeleteCategory = useCallback(() => {
    deleteCategoryMutation.mutate(data.id);
    openLoader();
  }, [data.id, openLoader, deleteCategoryMutation]);

  return (
    <Card p={'md'} className={'w-full shadow-md'}>
      <div className='flex justify-between items-center'>
        <div>
          <Text weight={'bold'}>{data.name}</Text>
          <Text size={'sm'}>{data.description}</Text>
        </div>
        <div className='flex gap-2'>
          <IconEdit className='cursor-pointer text-teal-600' size={20} />
          <IconTrash
            className='cursor-pointer text-rose-600'
            size={20}
            onClick={() => openConfirmDialog(handleDeleteCategory)}
          />
        </div>
      </div>
    </Card>
  );
};

export default CategoryComponent;
