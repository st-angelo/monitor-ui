import { Button } from '@mantine/core';
import { useTransactionDetail } from '../transaction/detail/useTransactionDetail';
import TransactionsComponent from '../transaction/TransactionsComponent';

const Wallet = () => {
  const [openTransactionDetail] = useTransactionDetail();

  return (
    <>
      <div className='md:w-2/3 m-auto p-10 md:p-0'>
        <div className='my-5 text-end'>
          <Button onClick={() => openTransactionDetail()}>
            Add transaction
          </Button>
        </div>
        <TransactionsComponent />
      </div>
    </>
  );
};

export default Wallet;
