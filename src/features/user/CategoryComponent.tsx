import { ActionIcon, Card, Modal, Text } from '@mantine/core';
import {
  completeNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { IconEdit, IconTrash } from '@tabler/icons';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { MonitorErrorData } from '../../dto';
import { Category } from '../../models/common';
import { deleteCategory } from '../../repository/categoryRepository';
import { useConfirmDialog } from '../common/confirm-dialog/useConfirmDialog';
import { showError, showSuccess } from '../common/notifications';
import CategoryDetailComponent from './CategoryDetailComponent';

interface CategoryComponentProps {
  data: Category;
}

const CategoryComponent = ({ data }: CategoryComponentProps) => {
  const client = useQueryClient();
  const confirm = useConfirmDialog();
  const [loading, setLoading] = useState(false);

  const [inEdit, setInEdit] = useState(false);

  const deleteCategoryMutation = useMutation(deleteCategory, {
    onError: (err: AxiosError<MonitorErrorData>) => {
      showError({
        message: err.response?.data.message,
      });
    },
    onSettled: () => {
      completeNavigationProgress();
      setLoading(false);
    },
    onSuccess: () => {
      client.invalidateQueries(['user-categories']);
      showSuccess({
        message: 'Your category was deleted',
      });
    },
  });

  const handleDeleteCategory = useCallback(() => {
    deleteCategoryMutation.mutate(data.id);
    setLoading(true);
    startNavigationProgress();
  }, [data.id, deleteCategoryMutation]);

  return (
    <>
      <Card p={'md'} className={'w-full shadow-md'}>
        <div className='flex justify-between items-center'>
          <div>
            <Text weight={'bold'}>{data.name}</Text>
            <Text size={'sm'}>{data.description}</Text>
          </div>
          <div className='flex gap-2'>
            <ActionIcon
              variant='filled'
              disabled={loading}
              onClick={() => setInEdit(true)}
            >
              <IconEdit size={20} />
            </ActionIcon>
            <ActionIcon
              variant='filled'
              color='orange'
              disabled={loading}
              onClick={() => confirm(handleDeleteCategory)}
            >
              <IconTrash size={20} />
            </ActionIcon>
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
