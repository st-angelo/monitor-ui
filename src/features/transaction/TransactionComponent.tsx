import { Card, Text } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons';
import { Transaction } from '../../models/transaction';

interface TransactionComponentProps {
  data: Transaction;
}

const TransactionComponent = ({ data }: TransactionComponentProps) => {
  console.log(data.date, typeof data.date);
  return (
    <Card p={'md'} className={'w-full shadow-md'}>
      <div className='flex justify-between items-center'>
        <div>
          <Text
            weight={'bold'}
          >{`${data.category?.name}, ${data.amount} ${data.currency}`}</Text>
          <Text size={'sm'}>{new Date(data.date).toLocaleString()}</Text>
        </div>
        <div className='flex gap-2'>
          <IconEdit className='cursor-pointer text-teal-600' size={20} />
          <IconTrash className='cursor-pointer text-rose-600' size={20} />
        </div>
      </div>
    </Card>
  );
};

export default TransactionComponent;
