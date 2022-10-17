import { Card, Text } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons';
import { Category } from '../../models/common';

interface CategoryComponentProps {
  data: Category;
}

const CategoryComponent = ({ data }: CategoryComponentProps) => {
  return (
    <Card p={'md'} className={'w-full shadow-md'}>
      <div className='flex justify-between items-center'>
        <div>
          <Text weight={'bold'}>{data.name}</Text>
          <Text size={'sm'}>{data.description}</Text>
        </div>
        <div className='flex gap-2'>
          <IconEdit className='cursor-pointer text-teal-600' size={20} />
          <IconTrash className='cursor-pointer text-rose-600' size={20} />
        </div>
      </div>
    </Card>
  );
};

export default CategoryComponent;
