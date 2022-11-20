import { Card, Modal, Text } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { MonitorErrorData } from '../../dto';
import { Category } from '../../models/common';
import { deleteCategory } from '../../repository/categoryRepository';
import { useConfirmDialog } from '../common/confirm-dialog/useConfirmDialog';
import { useLoader } from '../common/loader/useLoader';
import { showError, showSuccess } from '../common/notifications';
import CategoryDetailComponent from './CategoryDetailComponent';

interface CategoryComponentProps {
  data: Category;
}

const CategoryComponent = ({ data }: CategoryComponentProps) => {
  const client = useQueryClient();
  const confirm = useConfirmDialog();
  const [openLoader, closeLoader] = useLoader();

  const [inEdit, setInEdit] = useState(false);

  const deleteCategoryMutation = useMutation(deleteCategory, {
    onError: (err: AxiosError<MonitorErrorData>) => {
      showError({
        message: err.response?.data.message,
      });
    },
    onSettled: closeLoader,
    onSuccess: () => {
      client.invalidateQueries(['user-categories']);
      showSuccess({
        message: 'Your category was deleted',
      });
    },
  });

  const handleDeleteCategory = useCallback(() => {
    deleteCategoryMutation.mutate(data.id);
    openLoader();
  }, [data.id, openLoader, deleteCategoryMutation]);

  return (
    <>
      <Card p={'md'} className={'w-full shadow-md'}>
        <div className='flex justify-between items-center'>
          <div>
            <Text weight={'bold'}>{data.name}</Text>
            <Text size={'sm'}>{data.description}</Text>
          </div>
          <div className='flex gap-2'>
            <IconEdit
              className='cursor-pointer text-teal-600'
              size={20}
              onClick={() => setInEdit(true)}
            />
            <IconTrash
              className='cursor-pointer text-rose-600'
              size={20}
              onClick={() => confirm(handleDeleteCategory)}
            />
          </div>
        </div>
      </Card>
      {inEdit && (
        <Modal
          opened={inEdit}
          size={'auto'}
          centered
          onClose={() => setInEdit(false)}
          closeOnClickOutside={false}
        >
          <CategoryDetailComponent
            category={data}
            onEdit={() => setInEdit(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default CategoryComponent;
